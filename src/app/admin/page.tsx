
"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, 
  LogOut,
  Loader2,
  Plus,
  Upload,
  Save,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useAuth, useFirebaseApp, useUser } from "@/firebase";
import { Project, SiteContent, saveAllChanges, deleteProjectDoc, uploadImage, getSiteContent, getProjects } from "@/app/lib/db";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { toast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const db = useFirestore();
  const auth = useAuth();
  const app = useFirebaseApp();
  const storage = getStorage(app);
  const { user, loading: authLoading } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siteData, setSiteData] = useState<SiteContent | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      async function loadData() {
        const [content, projects] = await Promise.all([
          getSiteContent(db),
          getProjects(db)
        ]);
        setSiteData(content);
        setProjectsList(projects);
        setIsLoading(false);
      }
      loadData();
    }
  }, [db, user, authLoading, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const addProject = () => {
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      title: "",
      category: "AI Integration",
      description: "",
      summary: "",
      images: [],
      techStack: [],
      link: "",
      githubLink: ""
    };
    setProjectsList([newProject, ...projectsList]);
  };

  const removeProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProjectDoc(db, id);
      setProjectsList(projectsList.filter(p => p.id !== id));
      toast({ title: "Project deleted", description: "The project has been removed from the database." });
    }
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjectsList(projectsList.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'project', projectId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const path = type === 'profile' ? `profile/${file.name}` : `projects/${projectId}/${file.name}`;
      const url = await uploadImage(storage, file, path);
      
      if (type === 'profile' && siteData) {
        setSiteData({ ...siteData, profileImage: url });
      } else if (type === 'project' && projectId) {
        const project = projectsList.find(p => p.id === projectId);
        if (project) {
          updateProject(projectId, { images: [...project.images, url] });
        }
      }
      toast({ title: "Upload successful", description: "Image has been uploaded and linked." });
    } catch (error) {
      toast({ variant: "destructive", title: "Upload failed", description: "There was an error uploading your image." });
    }
  };

  const handleSave = async () => {
    if (!siteData) return;
    setIsSaving(true);
    try {
      await saveAllChanges(db, siteData, projectsList);
      toast({ title: "Changes saved!", description: "Portfolio has been updated successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Save failed", description: "Could not save changes to the database." });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || (isLoading && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary uppercase">
            Founder Dashboard
          </h1>
          <Button variant="outline" onClick={handleSignOut} className="gap-2 border-white/10 hover:bg-white/5">
            <LogOut size={16} /> Logout
          </Button>
        </header>

        {/* Global Content Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight">Manage Global Content</h2>
          </div>

          {siteData && (
            <Card className="bg-white/[0.02] border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Founder Headline</Label>
                  <Input 
                    value={siteData.headline}
                    onChange={(e) => setSiteData({ ...siteData, headline: e.target.value })}
                    className="bg-black/20 border-white/5 focus:border-primary/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Profile Image</Label>
                  <Input 
                    value={siteData.profileImage}
                    onChange={(e) => setSiteData({ ...siteData, profileImage: e.target.value })}
                    className="bg-black/20 border-white/5 focus:border-primary/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Upload New Profile Image</Label>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Input 
                        type="file" 
                        onChange={(e) => handleFileUpload(e, 'profile')}
                        className="bg-black/20 border-white/5 rounded-xl h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      />
                    </div>
                    <Button variant="secondary" className="h-12 px-6 rounded-xl gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      <Upload size={18} /> Upload Image
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">About Me</Label>
                  <Textarea 
                    value={siteData.aboutMe}
                    onChange={(e) => setSiteData({ ...siteData, aboutMe: e.target.value })}
                    className="bg-black/20 border-white/5 focus:border-primary/50 rounded-xl min-h-[150px] resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight">Manage Projects</h2>
          </div>

          <div className="space-y-8">
            {projectsList.map((project, index) => (
              <Card key={project.id} className="bg-white/[0.02] border-white/5 rounded-3xl overflow-hidden relative group shadow-2xl transition-all hover:border-white/10">
                <button 
                  onClick={() => removeProject(project.id)}
                  className="absolute top-6 right-6 p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors z-10"
                >
                  <Trash2 size={20} />
                </button>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Title</Label>
                    <Input 
                      value={project.title}
                      onChange={(e) => updateProject(project.id, { title: e.target.value })}
                      placeholder="Project Name - e.g. GAINIPO"
                      className="bg-black/20 border-white/5 rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Description</Label>
                    <Textarea 
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      className="bg-black/20 border-white/5 rounded-xl min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Category</Label>
                      <Select 
                        value={project.category} 
                        onValueChange={(v) => updateProject(project.id, { category: v as any })}
                      >
                        <SelectTrigger className="bg-black/20 border-white/5 rounded-xl h-12">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                          <SelectItem value="Social Media Automation">Social Media Automation</SelectItem>
                          <SelectItem value="Premium Web App">Premium Web App</SelectItem>
                          <SelectItem value="Bots for Business">Bots for Business</SelectItem>
                          <SelectItem value="AI Integration">AI Integration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tech Stack (comma separated)</Label>
                      <Input 
                        value={project.techStack.join(", ")}
                        onChange={(e) => updateProject(project.id, { techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        placeholder="Python, Next.js, OpenAI..."
                        className="bg-black/20 border-white/5 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Image Path (comma separated URLs)</Label>
                    <Textarea 
                      value={project.images.join("\n")}
                      onChange={(e) => updateProject(project.id, { images: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) })}
                      placeholder="Paste image URLs here (one per line)"
                      className="bg-black/20 border-white/5 rounded-xl min-h-[80px] font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Upload New Project Image</Label>
                    <div className="flex gap-4">
                      <Input 
                        type="file" 
                        onChange={(e) => handleFileUpload(e, 'project', project.id)}
                        className="bg-black/20 border-white/5 rounded-xl h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      />
                      <Button variant="secondary" className="h-12 px-6 rounded-xl gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        <Upload size={18} /> Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Live Project URL (Optional)</Label>
                      <Input 
                        value={project.link || ""}
                        onChange={(e) => updateProject(project.id, { link: e.target.value })}
                        placeholder="https://example.com"
                        className="bg-black/20 border-white/5 rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Github URL (Optional)</Label>
                      <Input 
                        value={project.githubLink || ""}
                        onChange={(e) => updateProject(project.id, { githubLink: e.target.value })}
                        placeholder="https://github.com/..."
                        className="bg-black/20 border-white/5 rounded-xl h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={addProject}
            variant="outline" 
            className="w-full h-16 rounded-[2rem] border-dashed border-white/10 hover:bg-white/5 hover:border-primary/50 transition-all font-headline tracking-tighter uppercase"
          >
            <Plus className="mr-2" size={20} /> Add New Project
          </Button>
        </section>

        <footer className="pt-12 pb-24 border-t border-white/5">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-16 rounded-3xl bg-primary hover:bg-primary/90 text-white font-headline text-lg tracking-tighter uppercase shadow-[0_0_40px_rgba(255,123,0,0.3)] transition-all hover:scale-[1.01]"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <><Save className="mr-2" /> Save All Changes</>}
          </Button>
        </footer>
      </div>
    </div>
  );
}
