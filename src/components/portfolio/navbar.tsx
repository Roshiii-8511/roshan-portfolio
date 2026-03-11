
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const socials = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/roshan-singh-gainipo", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Roshiii-8511", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/singh_.roshan._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-headline text-lg font-bold tracking-tighter group">
          ROSHAN <span className="text-primary group-hover:text-glow-orange transition-all">SINGH</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {["Expertise", "Projects", "About", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Socials & CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 pr-6 border-r border-white/10">
            {socials.map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
            <a 
              href="mailto:raushanar123@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Mail size={18} />
            </a>
          </div>

          <a 
            href="https://www.upwork.com/freelancers/~015e9eaa4d183e12b3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-headline text-[10px] font-bold tracking-tighter uppercase hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,123,0,0.2)] active:scale-95"
          >
            START A PROJECT <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
