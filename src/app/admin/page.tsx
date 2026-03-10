"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCircle, 
  Wand2, 
  Plus, 
  Trash2, 
  LogOut,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useAuth, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { Project, SiteContent, saveProject, deleteProject, updateSiteContent } from "@/app/lib/db";
import { generateProjectDescription } from "@/ai/flows/generate-project-description";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { collection, query, orderBy, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const router = useRouter();
  const db = useFirestore();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: projects = [], loading: projectsLoading } = useCollection<Project>(projectsQuery);
  
  const siteContentRef = useMemoFirebase(() => {
    return doc(db, 'site', 'content');
  }, [db]);
  
  const { data: siteContent } = useDoc<SiteContent>(siteContentRef);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [aiResult, setAiResult] = useState<{description: string, summary: string} | null>(null);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;
    
    saveProject(db, {
      title: editingProject.title || "",
      category: (editingProject.category as any) || "AI Integration",
      description: editingProject.description || "",
      summary: editingProject.summary || "",
      images: editingProject.images || ["https://picsum.photos/seed/new/800/600"],
      techStack: editingProject.techStack || ["AI"],
      link: editingProject.link || ""
    }, editingProject.id);
    
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateProjectDescription({
        technicalNotes,
        bulletPoints: bulletPoints.split('\n').filter(p => p.trim() !== '')
      });
      setAiResult(result);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-white/5 bg-black/20 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="font-headline text-lg font-bold tracking-tighter">
            ADMIN <span className="text-primary">PORTAL</span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "overview" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "projects" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}
          >
            <Briefcase size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "profile" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}
          >
            <UserCircle size={20} /> Profile
          </button>
          <button 
            onClick={() => setActiveTab("ai-tool")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "ai-tool" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}
          >
            <Wand2 size={20} /> AI Assistant
          </button>
        </nav>

        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all mt-auto"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline">Portfolio Status</h2>
                <p className="text-muted-foreground">Monitoring active projects and system performance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">Live Projects</div>
                    <div className="text-4xl font-headline font-bold">{projects.length}</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">Last Update</div>
                    <div className="text-xl font-headline font-bold">Today</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">Database Mode</div>
                    <div className="text-xl font-headline font-bold text-accent">REALTIME</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-headline">Manage Projects</h2>
                <Button className="gap-2" onClick={() => {
                  setEditingProject({});
                  setIsDialogOpen(true);
                }}>
                  <Plus size={18} /> New Project
                </Button>
              </div>

              <div className="space-y-4">
                {projectsLoading ? (
                  <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="glass-card p-6 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-white/5 relative overflow-hidden">
                          <img src={project.images[0]} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <h4 className="font-bold">{project.title}</h4>
                          <p className="text-xs text-muted-foreground">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setEditingProject(project);
                          setIsDialogOpen(true);
                        }}>Edit</Button>
                        <Button variant="destructive" size="icon" onClick={() => deleteProject(db, project.id)}><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-headline">Site Configuration</h2>
              </div>

              {siteContent && (
                <div className="glass-card p-8 rounded-2xl space-y-6">
                  <div className="space-y-4">
                    <Label>Headline</Label>
                    <Input 
                      value={siteContent.headline} 
                      onChange={(e) => updateSiteContent(db, {...siteContent, headline: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>About Me</Label>
                    <Textarea 
                      value={siteContent.aboutMe} 
                      onChange={(e) => updateSiteContent(db, {...siteContent, aboutMe: e.target.value})}
                      className="bg-white/5 border-white/10 min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Profile Image URL</Label>
                    <Input 
                      value={siteContent.profileImage}
                      onChange={(e) => updateSiteContent(db, {...siteContent, profileImage: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "ai-tool" && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-headline flex items-center gap-3">
                  <Wand2 className="text-primary" /> AI Project Copywriter
                </h2>
                <p className="text-muted-foreground mt-2">Transform raw notes into professional copy.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <Label>Context Notes</Label>
                    <Textarea 
                      placeholder="Technical details..."
                      className="bg-white/5 border-white/10 min-h-[120px]"
                      value={technicalNotes}
                      onChange={(e) => setTechnicalNotes(e.target.value)}
                    />
                    <Label>Bullet Points</Label>
                    <Textarea 
                      placeholder="Features..."
                      className="bg-white/5 border-white/10 min-h-[120px]"
                      value={bulletPoints}
                      onChange={(e) => setBulletPoints(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAiGenerate} disabled={isGenerating || !technicalNotes} className="w-full">
                    {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
                    GENERATE
                  </Button>
                </div>

                {aiResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 rounded-2xl space-y-6">
                    <div>
                      <Label className="text-accent text-[10px] uppercase font-bold">Summary</Label>
                      <p className="text-sm italic">{aiResult.summary}</p>
                    </div>
                    <div>
                      <Label className="text-accent text-[10px] uppercase font-bold">Description</Label>
                      <p className="text-sm text-muted-foreground">{aiResult.description}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => navigator.clipboard.writeText(aiResult.description)}>
                      Copy to Clipboard
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingProject?.id ? 'Edit' : 'New'} Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProject} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={editingProject?.title || ""} 
                  onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={editingProject?.category} 
                  onValueChange={v => setEditingProject({...editingProject, category: v as any})}
                >
                  <SelectTrigger className="bg-white/5">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium Web/App">Premium Web/App</SelectItem>
                    <SelectItem value="Bots for Business">Bots for Business</SelectItem>
                    <SelectItem value="AI Integration">AI Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Summary (Short)</Label>
              <Input 
                value={editingProject?.summary || ""} 
                onChange={e => setEditingProject({...editingProject, summary: e.target.value})}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea 
                value={editingProject?.description || ""} 
                onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                className="bg-white/5 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack (Comma separated)</Label>
              <Input 
                value={editingProject?.techStack?.join(", ") || ""} 
                onChange={e => setEditingProject({...editingProject, techStack: e.target.value.split(",").map(s => s.trim())})}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Main Image URL</Label>
              <Input 
                value={editingProject?.images?.[0] || ""} 
                onChange={e => setEditingProject({...editingProject, images: [e.target.value]})}
                className="bg-white/5"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
