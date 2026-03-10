
"use client";

import { useEffect, useState } from "react";
import { Instagram, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
            <a 
              href="https://www.linkedin.com/in/roshan-singh-gainipo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-all duration-300 hover:scale-125"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com/Roshiii-8511" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-all duration-300 hover:scale-125"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.instagram.com/singh_.roshan._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-all duration-300 hover:scale-125"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="mailto:raushanar123@gmail.com" 
              className="hover:text-primary transition-all duration-300 hover:scale-125"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <a 
            href="https://www.upwork.com/freelancers/~015e9eaa4d183e12b3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-10 py-4 rounded-full font-headline text-sm font-bold flex items-center gap-3 hover:bg-primary hover:text-white transition-all group tracking-tighter uppercase inline-flex"
          >
            START A PROJECT <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-muted-foreground font-code uppercase tracking-widest">
        <div>&copy; {year || "..."} ROSHAN SINGH — POWERED BY THE FUTURE</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
