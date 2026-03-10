"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/app/lib/db";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export function ProjectPortfolio({ projects = [] }: { projects?: Project[] }) {
  const categories = ["ALL", "PREMIUM WEB APPS", "ADVANCED WEB SCRAPING", "BOTS FOR BUSINESS", "AI AUTOMATION"];
  const [activeCategory, setActiveCategory] = useState("ALL");

  const safeProjects = Array.isArray(projects) ? projects : [];

  const categoryPriority: Record<string, number> = {
    "PREMIUM WEB APPS": 1,
    "ADVANCED WEB SCRAPING": 2,
    "BOTS FOR BUSINESS": 3,
    "AI AUTOMATION": 4,
  };

  const filteredProjects = activeCategory === "ALL" 
    ? [...safeProjects].sort((a, b) => {
        const priorityA = categoryPriority[a.category?.toUpperCase() || ""] || 99;
        const priorityB = categoryPriority[b.category?.toUpperCase() || ""] || 99;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return 0;
      })
    : safeProjects.filter(p => p.category?.toUpperCase() === activeCategory);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div className="flex items-center gap-4">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter uppercase">Project Portfolio</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all uppercase ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/5 hover:bg-white/10 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.04, 
                y: -10,
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 20px rgba(255, 123, 0, 0.15)",
                borderColor: "hsla(29, 100%, 50%, 0.3)"
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <Carousel 
                    className="w-full h-full"
                    plugins={[
                      Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {project.images.map((img, i) => (
                        <CarouselItem key={i}>
                          <div className="relative aspect-video w-full h-full">
                            <Image
                              src={img}
                              alt={`${project.title} - image ${i + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No image available</span>
                  </div>
                )}
                <div className="absolute top-6 left-6 z-10">
                  <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/10 text-[10px] font-bold">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack?.map(tech => (
                    <span key={tech} className="text-[10px] font-code px-2 py-1 rounded bg-white/5 text-accent/80 transition-colors group-hover:bg-accent/10">
                      #{tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors tracking-widest uppercase">
                      <ExternalLink size={14} /> View Project
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
