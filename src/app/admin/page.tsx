
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCircle, 
  Wand2, 
  Plus, 
  Save, 
  Trash2, 
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project, SiteContent, getProjects, getSiteContent } from "@/app/lib/db";
import { generateProjectDescription } from "@/ai/flows/generate-project-description";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // AI Tool States
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [aiResult, setAiResult] = useState<{description: string, summary: string} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [p, c] = await Promise.all([getProjects(), getSiteContent()]);
      setProjects(p);
      setContent(c);
    };
    fetchData();
  }, []);

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

  const saveContent = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Content saved successfully!");
    }, 1000);
  };

  if (!content) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
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
          onClick={() => router.push("/login")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all mt-auto"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold font-headline">Welcome back, Roshan</h2>
                  <p className="text-muted-foreground">Manage your portfolio and global settings.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">Total Projects</div>
                    <div className="text-4xl font-headline font-bold">{projects.length}</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">Website Hits</div>
                    <div className="text-4xl font-headline font-bold">1.2k</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="text-muted-foreground text-sm mb-1">AI Assist Usage</div>
                    <div className="text-4xl font-headline font-bold">24</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-headline">Manage Projects</h2>
                <Button className="gap-2">
                  <Plus size={18} /> New Project
                </Button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card p-6 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-white/5 relative overflow-hidden">
                        <img src={project.images[0]} alt="" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="icon"><Trash2 size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-headline">Site Global Content</h2>
                <Button onClick={saveContent} disabled={isSaving} className="gap-2">
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              <div className="grid gap-8">
                <div className="glass-card p-8 rounded-2xl space-y-6">
                  <div className="space-y-4">
                    <Label>Headline</Label>
                    <Input 
                      value={content.headline} 
                      onChange={(e) => setContent({...content, headline: e.target.value})}
                      className="bg-white/5 border-white/10 text-lg font-bold h-12"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>About Me</Label>
                    <Textarea 
                      value={content.aboutMe} 
                      onChange={(e) => setContent({...content, aboutMe: e.target.value})}
                      className="bg-white/5 border-white/10 min-h-[150px] leading-relaxed"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Profile Image URL</Label>
                    <div className="flex gap-4">
                      <Input 
                        value={content.profileImage}
                        onChange={(e) => setContent({...content, profileImage: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                      <Button variant="secondary" className="gap-2 shrink-0">
                        <ImageIcon size={18} /> Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai-tool" && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-headline flex items-center gap-3">
                  <Wand2 className="text-primary" /> AI Project Copywriter
                </h2>
                <p className="text-muted-foreground mt-2">Generate polished project descriptions from rough notes.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <Label>Technical Details / Context</Label>
                    <Textarea 
                      placeholder="e.g., A Python-based script that uses Selenium and OpenAI API to automate Twitter interactions."
                      className="bg-white/5 border-white/10 min-h-[120px]"
                      value={technicalNotes}
                      onChange={(e) => setTechnicalNotes(e.target.value)}
                    />
                  </div>

                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <Label>Key Features (One per line)</Label>
                    <Textarea 
                      placeholder="Automatic daily posting&#10;Sentiment analysis for replies&#10;Proxy rotation for scale"
                      className="bg-white/5 border-white/10 min-h-[120px]"
                      value={bulletPoints}
                      onChange={(e) => setBulletPoints(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={handleAiGenerate} 
                    disabled={isGenerating || !technicalNotes}
                    className="w-full h-12 font-headline gap-2"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                    {isGenerating ? "CRAFTING CONTENT..." : "GENERATE DESCRIPTION"}
                  </Button>
                </div>

                <div className="space-y-6">
                  {aiResult ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-6 rounded-2xl space-y-6 relative border-accent/20"
                    >
                      <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground p-1.5 rounded-full shadow-lg">
                        <CheckCircle2 size={16} />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase tracking-widest text-[10px]">Polished Summary</Label>
                        <p className="text-sm italic font-medium leading-relaxed">{aiResult.summary}</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase tracking-widest text-[10px]">Project Description</Label>
                        <p className="text-sm leading-relaxed text-muted-foreground">{aiResult.description}</p>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText(aiResult.description);
                            alert("Copied to clipboard!");
                          }}
                        >
                          Copy Description
                        </Button>
                        <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">Use Result</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                      <Wand2 size={48} className="text-white/10 mb-4" />
                      <p className="text-muted-foreground text-sm">Your AI-generated content will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
