"use client";

import { ProjectCard } from "./ProjectCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { MobileCarousel } from "./MobileCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function ProjectShowcase() {
  const isMobile = useIsMobile();

  const projects = [
    {
      title: "Silk Harvest",
      description: "A Fabric mod for Minecraft 1.21.1 that adds a balanced system where mobs drop their vanilla spawn eggs when killed by a player using an item enchanted with Silk Touch.",
      tags: ["Java", "Fabric", "Minecraft", "Mod"],
      imageUrl: "/images/dependable.jpg",
      githubUrl: "https://github.com/Diffraction-Works/silk-harvest",
      hint: "minecraft mod",
      language: "Java"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Open Source</h2>
              <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Project Showcase</h3>
              <p className="font-body text-muted-foreground mt-4 text-lg">
                Explore our latest contributions to the open-source community, focusing on tools for creators and developers.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal 
              key={project.title} 
              animation="fade-up" 
              delay={idx * 150}
            >
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>


        {/* Mobile Carousel */}
        <div className="md:hidden">
          <MobileCarousel
            items={projects}
            renderItem={(project) => (
              <ProjectCard {...project} />
            )}
            showDots={true}
            showArrows={true}
          />
        </div>
      </div>
    </section>
  );
}
