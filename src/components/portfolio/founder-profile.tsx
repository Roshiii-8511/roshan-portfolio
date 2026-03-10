"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiteContent } from "@/app/lib/db";
import { Briefcase, TrendingUp, Code2, BrainCircuit } from "lucide-react";

function Counter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export function FounderProfile({ content }: { content: SiteContent }) {
  const stats = [
    { icon: Code2, target: 50, suffix: "+", label: "BOTS BUILT", desc: "Successfully deployed autonomous agents for diverse use cases." },
    { icon: Briefcase, target: 2, suffix: "+", label: "YEARS EXPERIENCE", desc: "Of crafting complex business programs through code." },
    { icon: TrendingUp, target: 400, suffix: "%", label: "REVENUE INCREASE", desc: "Average efficiency gain through automation pipelines." },
    { icon: BrainCircuit, target: 1, suffix: "M+", label: "DATA POINTS", desc: "Processed daily through high-performance crawlers." },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="about">
      {/* Strategy Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tighter uppercase">
            The Strategy Behind <span className="text-primary">The Code</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between Computer Science precision and MBA strategic vision. I specialize in building robust automation frameworks that scale business processes through intelligent technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl flex flex-col items-start border-white/5 hover:border-primary/20 transition-colors"
            >
              <stat.icon className="text-primary mb-6" size={32} />
              <div className="font-headline text-3xl font-bold mb-1">
                <Counter value={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-primary text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">{stat.label}</div>
              <p className="text-muted-foreground text-xs leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="pt-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase text-primary">#founder-profile</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] bg-primary/5 border-primary/20 mb-12">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              I am Roshan Singh, a Computer Science Engineer and MBA Candidate at Manipal University. I specialize in the intersection of engineering rigor and strategic business growth. My mission is to build the autonomous future where business logic flows without human intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h3 className="font-headline text-xl font-bold mb-6 text-primary tracking-tight">Technical Core</h3>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> AI Agent Architecture</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Autonomous Data Pipelines</li>
              </ul>
            </div>
            <div className="glass-card p-8 rounded-[2rem] border-white/5">
              <h3 className="font-headline text-xl font-bold mb-6 text-primary tracking-tight">Business Vision</h3>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> AI-focused automation</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Strategic Tech Consulting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
