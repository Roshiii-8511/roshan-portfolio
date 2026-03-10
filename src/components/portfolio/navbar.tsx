
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-headline text-lg font-bold tracking-tighter">
          Roshan <span className="text-primary">Singh</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {["Expertise", "Projects", "About", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
