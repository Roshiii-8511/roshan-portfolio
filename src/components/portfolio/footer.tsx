
import { Instagram, Linkedin, Github, Mail, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 px-4 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="font-headline text-2xl font-bold mb-2 tracking-tighter">
            ROSHAN <span className="text-primary">SINGH</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Engineering the future through autonomous systems.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
            <Instagram size={24} />
          </a>
          <a href="mailto:hello@roshansingh.ai" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={24} />
          </a>
        </div>

        <div className="text-center md:text-right">
          <button className="glass-card px-8 py-3 rounded-full font-headline text-sm font-bold flex items-center gap-3 hover:bg-primary hover:text-white transition-all group">
            START A PROJECT <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground font-code">
        &copy; {new Date().getFullYear()} ROSHAN SINGH — DESIGNED FOR THE FUTURE
      </div>
    </footer>
  );
}
