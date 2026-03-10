"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiteContent } from "@/app/lib/db";
import { Briefcase, TrendingUp, Code2, BrainCircuit, GraduationCap, Zap, Target, Rocket } from "lucide-react";

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
      {/* Narrative Section */}
      <div className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-tight">
              The Bridge Between <br />
              <span className="text-primary text-glow-orange">Engineering & Business</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-8" />
            <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
              <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                Hi, I’m <span className="text-primary">Roshan Singh</span>. I don’t just write code; I architect systems that think, scale, and eliminate human friction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based in the heart of Patna, Bihar, my journey in technology has always been driven by a single question: "How can we make this faster, smarter, and fully autonomous?"
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="glass-card p-6 rounded-3xl border-primary/10">
              <GraduationCap className="text-primary mb-4" size={32} />
              <h4 className="font-headline text-sm font-bold mb-2">B.Tech + MBA</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Founder of complex full-stack architectures currently pursuing an MBA from Manipal University.
              </p>
            </div>
            <div className="glass-card p-6 rounded-3xl border-accent/10">
              <Zap className="text-accent mb-4" size={32} />
              <h4 className="font-headline text-sm font-bold mb-2">Automate Everything</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If a task has to be done twice, it should be automated. Obsessed with serverless pipelines.
              </p>
            </div>
            <div className="glass-card p-6 rounded-3xl border-secondary/10">
              <Target className="text-secondary mb-4" size={32} />
              <h4 className="font-headline text-sm font-bold mb-2">Business ROI</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Code is useless if it doesn't solve a real-world business problem and increase man-hour savings.
              </p>
            </div>
            <div className="glass-card p-6 rounded-3xl border-white/5">
              <Rocket className="text-white mb-4" size={32} />
              <h4 className="font-headline text-sm font-bold mb-2">Production Grade</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Engineering Next.js ecosystems and Python-based automation that deliver tangible results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tighter uppercase mb-4">Strategic Impact</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-code">Measuring Efficiency in Real-Time</p>
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

      {/* Philosophy Section */}
      <div className="pt-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4 uppercase tracking-tight">Core Specialization</h3>
            <p className="text-muted-foreground italic">"I build the autonomous future where business logic flows without human intervention."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 size={80} />
              </div>
              <h3 className="font-headline text-lg font-bold mb-6 text-primary tracking-tight">Technical Core</h3>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Next.js full-stack architectures & Serverless Pipelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Python-based automation & Autonomous Agents</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>OAuth2 & Token Rotation for Social Media APIs</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} />
              </div>
              <h3 className="font-headline text-lg font-bold mb-6 text-primary tracking-tight">Business Vision</h3>
              <ul className="space-y-4 text-muted-foreground text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Strategic ROI analysis for automation deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Generative AI for 24/7 sales & customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Market data extraction for financial intelligence</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] bg-primary/5 border-primary/20 text-center">
            <h4 className="font-headline text-xl font-bold mb-6 uppercase">Beyond the Screen</h4>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              When I’m not debugging Python scripts or fine-tuning prompts for Gemini, I’m analyzing market trends and brainstorming my next SaaS venture. I am actively seeking high-impact collaborations where I can deploy my technical expertise and business strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
