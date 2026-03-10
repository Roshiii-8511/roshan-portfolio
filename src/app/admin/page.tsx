"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, 
  LogOut,
  Loader2,
  Plus,
  Upload,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useAuth, useFirebaseApp, useUser } from "@/firebase";
import { Project, SiteContent, saveAllChanges, deleteProjectDoc, uploadImage, getSiteContent, getProjects } from "@/app/lib/db";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const db = useFirestore();
  const auth = useAuth();
  const app = useFirebaseApp();
  const storage = getStorage(app);
  const { user, loading: authLoading } = useUser();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [siteData, setSiteData] = useState<SiteContent | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [projectFileMap, setProjectFileMap] = useState<Record<string, File>>({});

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    async function loadData() {
      try {
        const [content, projects] = await Promise.all([
          getSiteContent(db),
          getProjects(db)
        ]);
        setSiteData(content);
        setProjectsList(projects);
      } catch (err) {
        console.error("Data load error:", err);
        toast({
          variant: "destructive",
          title: "Failed to load data",
          description: "Check your database permissions in Firebase Console.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [db, user, authLoading, router, toast]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const addProject = () => {
    const newProject: Project = {
      id: `temp-${Date.now()}`,
      title: "",
      category: "AI Automation",
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
      try {
        await deleteProjectDoc(db, id);
        setProjectsList(projectsList.filter(p => p.id !== id));
        toast({ title: "Project deleted" });
      } catch (err) {
        // Detailed error already handled by emitter
        toast({ variant: "destructive", title: "Delete failed" });
      }
    }
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjectsList(projectsList.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'project', projectId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'profile') {
      setProfileFile(file);
    } else if (projectId) {
      setProjectFileMap(prev => ({ ...prev, [projectId]: file }));
    }
  };

  const handleUpload = async (type: 'profile' | 'project', projectId?: string) => {
    const file = type === 'profile' ? profileFile : (projectId ? projectFileMap[projectId] : null);
    
    if (!file) {
      toast({ variant: "destructive", title: "No file selected", description: "Please pick a file first." });
      return;
    }

    const uploadKey = projectId || 'profile';
    setIsUploading(uploadKey);

    try {
      const timestamp = Date.now();
      const path = type === 'profile' 
        ? `profile/roshan-${timestamp}-${file.name}` 
        : `projects/${projectId || 'new'}/${timestamp}-${file.name}`;
      
      const url = await uploadImage(storage, file, path);
      
      if (type === 'profile' && siteData) {
        setSiteData({ ...siteData, profileImage: url });
        setProfileFile(null);
      } else if (type === 'project' && projectId) {
        const project = projectsList.find(p => p.id === projectId);
        if (project) {
          updateProject(projectId, { images: [...project.images, url] });
          setProjectFileMap(prev => {
            const next = { ...prev };
            delete next[projectId];
            return next;
          });
        }
      }
      toast({ title: "Upload successful" });
    } catch (error: any) {
      console.error("UPLOAD ERROR:", error);
      
      let errorMessage = error.message || "Unknown storage error.";
      if (error.code === 'storage/unauthorized') {
        errorMessage = "Permission Denied: Please update your Firebase Storage rules to allow authenticated writes.";
      }

      toast({ 
        variant: "destructive", 
        title: "Upload failed", 
        description: errorMessage 
      });
    } finally {
      setIsUploading(null);
    }
  };

  const handleSave = async () => {
    if (!siteData) return;
    setIsSaving(true);
    try {
      await saveAllChanges(db, siteData, projectsList);
      toast({ title: "Changes saved!" });
    } catch (error: any) {
      console.error("Save Error:", error);
      let desc = "Check your Firestore rules in Firebase Console.";
      if (error.code === 'permission-denied') {
        desc = "Firestore Error: Permission Denied. Ensure your Firestore rules allow 'write' for authenticated users.";
      }
      toast({ 
        variant: "destructive", 
        title: "Save failed", 
        description: desc
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoading) {
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
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary uppercase">
              Founder Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-code">Authorized: {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2 border-white/10 hover:bg-white/5">
            <LogOut size={16} /> Logout
          </Button>
        </header>

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

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Profile Image Management</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-black/40">
                      <img src={siteData.profileImage} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Input 
                          type="file" 
                          onChange={(e) => onFileSelect(e, 'profile')}
                          className="bg-black/20 border-white/5 rounded-xl h-10 text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary"
                        />
                        <Button 
                          onClick={() => handleUpload('profile')}
                          disabled={!profileFile || isUploading === 'profile'}
                          className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90"
                        >
                          {isUploading === 'profile' ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                          <span className="ml-2 text-xs">Upload</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
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

        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight">Manage Projects</h2>
          </div>

          <div className="space-y-8">
            {projectsList.map((project) => (
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
                      placeholder="Project Name"
                      className="bg-black/20 border-white/5 rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Summary (Short)</Label>
                    <Textarea 
                      value={project.summary}
                      onChange={(e) => updateProject(project.id, { summary: e.target.value })}
                      className="bg-black/20 border-white/5 rounded-xl min-h-[80px] resize-none"
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
                          <SelectItem value="Premium Web Apps">Premium Web Apps</SelectItem>
                          <SelectItem value="Advanced Web Scraping">Advanced Web Scraping</SelectItem>
                          <SelectItem value="Bots for Business">Bots for Business</SelectItem>
                          <SelectItem value="AI Automation">AI Automation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tech Stack (comma separated)</Label>
                      <Input 
                        value={project.techStack.join(", ")}
                        onChange={(e) => updateProject(project.id, { techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        placeholder="Python, Next.js..."
                        className="bg-black/20 border-white/5 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Gallery ({project.images.length} images)</Label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.images.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                          <img src={img} className="object-cover w-full h-full" alt="Project" />
                          <button 
                            onClick={() => updateProject(project.id, { images: project.images.filter((_, i) => i !== idx) })}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} className="text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="file" 
                        onChange={(e) => onFileSelect(e, 'project', project.id)}
                        className="bg-black/20 border-white/5 rounded-xl h-10 text-xs file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary"
                      />
                      <Button 
                        onClick={() => handleUpload('project', project.id)}
                        disabled={!projectFileMap[project.id] || isUploading === project.id}
                        className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90"
                      >
                        {isUploading === project.id ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                        <span className="ml-2 text-xs">Add Image</span>
                      </Button>
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
            {isSaving ? <Loader2 className="animate-spin" /> : <Save className="mr-2" />} Save All Changes
          </Button>
        </footer>
      </div>
    </div>
  );
}
