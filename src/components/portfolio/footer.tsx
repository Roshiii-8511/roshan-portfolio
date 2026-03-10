
import { Instagram, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-background" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0">
        <div className="max-w-md">
          <h2 className="font-headline text-3xl font-bold mb-6 tracking-tighter uppercase">
            ROSHAN <span className="text-primary">SINGH</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            ENGINEERING THE FUTURE THROUGH AUTONOMOUS SYSTEMS. ARCHITECTING EFFICIENCY AT SCALE.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="mailto:hello@roshansingh.ai" className="hover:text-primary transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <button className="bg-white text-black px-10 py-4 rounded-full font-headline text-sm font-bold flex items-center gap-3 hover:bg-primary hover:text-white transition-all group tracking-tighter uppercase">
            START A PROJECT <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-muted-foreground font-code uppercase tracking-widest">
        <div>&copy; {new Date().getFullYear()} ROSHAN SINGH — POWERED BY THE FUTURE</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
