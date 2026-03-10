
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/app/lib/db";

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-12 pb-24 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 2, y: -10 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
        className="relative mb-12 cursor-pointer z-10"
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-[0_0_50px_rgba(255,123,0,0.3)] bg-background">
          <Image
            src={content.profileImageUrl || "https://picsum.photos/seed/roshan/400/400"}
            alt="Roshan Singh"
            fill
            className="object-cover transition-all duration-500"
            priority
            data-ai-hint="professional portrait"
          />
        </div>
        <div className="absolute -inset-4 rounded-full border-2 border-primary/10 animate-pulse -z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center max-w-5xl"
      >
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter leading-none uppercase">
          Architecting<br />
          <span className="text-primary text-glow-orange">Autonomous AI Systems</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-wide font-code">
          ROSHAN SINGH — ENGINEER OF EFFICIENCY, ARCHITECT OF AUTOMATION.
        </p>
      </motion.div>
    </section>
  );
}
