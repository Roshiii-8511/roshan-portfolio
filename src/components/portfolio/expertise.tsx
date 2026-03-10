
"use client";

import { motion } from "framer-motion";
import { Zap, Search, Repeat, Cpu, BrainCircuit } from "lucide-react";

const expertise = [
  {
    title: "Social Media Automation",
    description: "End-to-end engines for content creation, scheduling, and community engagement using LLMs.",
    icon: BrainCircuit,
    color: "text-primary"
  },
  {
    title: "Advanced Web Scraping",
    description: "High-volume data extraction from complex platforms with anti-bot evasion and proxy management.",
    icon: Search,
    color: "text-accent"
  },
  {
    title: "Workflow Automation",
    description: "Streamlining business processes with custom integrations across Zapier, Make, and proprietary APIs.",
    icon: Repeat,
    color: "text-secondary"
  },
  {
    title: "AI System Architecture",
    description: "Designing scalable RAG systems and autonomous agent frameworks for enterprise applications.",
    icon: Cpu,
    color: "text-primary"
  },
  {
    title: "Growth Engineering",
    description: "Technical solutions for user acquisition and retention through data-driven automation tools.",
    icon: Zap,
    color: "text-accent"
  }
];

export function Expertise() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Core Expertise</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group cursor-default"
          >
            <div className={`p-4 rounded-xl bg-white/5 mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
              <item.icon size={32} />
            </div>
            <h3 className="font-headline text-lg font-semibold mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
