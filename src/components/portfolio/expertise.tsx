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
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              boxShadow: "0 20px 40px rgba(255,123,0,0.15)",
              borderColor: "hsla(29, 100%, 50%, 0.3)"
            }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: index * 0.1 
            }}
            className="glass-card p-8 rounded-3xl border-white/5 transition-all group cursor-default"
          >
            <div className={`mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
              <item.icon size={32} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
