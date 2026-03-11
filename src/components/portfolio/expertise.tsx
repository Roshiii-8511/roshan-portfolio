"use client";

import { motion } from "framer-motion";
import { Search, Repeat, Cpu, BrainCircuit, Zap } from "lucide-react";

const expertise = [
  {
    title: "Social Media Automation",
    description: "AI engine that shells your brand voice, handle DMs, and drive sales from Google Sheets.",
    icon: BrainCircuit,
    color: "text-primary"
  },
  {
    title: "Advanced Web Scraping",
    description: "High performance extraction from complex platforms with anti-bot bypass and proxy management.",
    icon: Search,
    color: "text-primary"
  },
  {
    title: "Workflow Automation",
    description: "Streamlining business processes with custom integrations across Make, Zapier, and third-party APIs.",
    icon: Repeat,
    color: "text-primary"
  },
  {
    title: "AI System Architecture",
    description: "Designing robust RAG systems and autonomous agent frameworks for enterprise applications.",
    icon: Cpu,
    color: "text-primary"
  },
  {
    title: "Growth Engineering",
    description: "Technical solutions to manage the gap between product and marketing through automation indexing.",
    icon: Zap,
    color: "text-primary"
  }
];

export function Expertise() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="expertise">
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 tracking-tighter uppercase">Core Expertise</h2>
        <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              y: -15,
              rotateX: 5,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(255, 123, 0, 0.4)",
              borderColor: "hsla(29, 100%, 50%, 0.6)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              delay: index * 0.05 
            }}
            className="glass-card p-8 rounded-[2.5rem] border-white/5 transition-all group cursor-default relative overflow-hidden"
          >
            <div className={`mb-6 ${item.color} group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ease-out flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03]`}>
              <item.icon size={36} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight uppercase">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {item.description}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <div className="absolute -inset-4 bg-primary/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
