
"use client";

import { motion } from "framer-motion";
import { SiteContent } from "@/app/lib/db";
import { GraduationCap, Briefcase, TrendingUp, Code2 } from "lucide-react";

export function FounderProfile({ content }: { content: SiteContent }) {
  return (
    <section className="py-24 px-4 bg-white/[0.02]" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">
              The Strategy Behind <span className="text-primary">The Code</span>
            </h2>
            <div className="h-1 w-32 bg-secondary rounded-full mb-8" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.aboutMe}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <GraduationCap size={24} />
                <h4 className="font-headline text-sm font-bold">Academic Core</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Computer Science major with a focus on Distributed Systems and Machine Learning architectures.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-4 text-accent">
                <TrendingUp size={24} />
                <h4 className="font-headline text-sm font-bold">Business Vision</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                MBA integration bringing high-level strategic planning and market analysis to technical execution.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-4 pt-12">
            <div className="glass-card aspect-square rounded-3xl flex flex-col items-center justify-center p-6 text-center">
              <Code2 className="text-accent mb-4" size={40} />
              <div className="font-headline text-2xl font-bold">50+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Bots Built</div>
            </div>
            <div className="glass-card aspect-square rounded-3xl flex flex-col items-center justify-center p-6 text-center bg-primary/10 border-primary/20">
              <TrendingUp className="text-primary mb-4" size={40} />
              <div className="font-headline text-2xl font-bold">400%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Efficiency Gain</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-card aspect-square rounded-3xl flex flex-col items-center justify-center p-6 text-center bg-accent/10 border-accent/20">
              <Briefcase className="text-accent mb-4" size={40} />
              <div className="font-headline text-2xl font-bold">5+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="glass-card aspect-square rounded-3xl flex flex-col items-center justify-center p-6 text-center">
              <BrainCircuit className="text-secondary mb-4" size={40} />
              <div className="font-headline text-2xl font-bold">1M+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Data Points/Day</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
