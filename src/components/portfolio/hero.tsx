
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/app/lib/db";

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-10 group"
      >
        {/* Spinning Border */}
        <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-4 rounded-full border border-accent/30 animate-spin-slow [animation-direction:reverse] opacity-30" />
        
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background shadow-2xl">
          <Image
            src={content.profileImage}
            alt="Roshan Singh"
            fill
            className="object-cover"
            priority
            data-ai-hint="professional portrait"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent text-glow-orange">
          {content.headline}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Roshan Singh — Engineer of Efficiency, Architect of Automation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 animate-bounce"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
