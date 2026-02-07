"use client";

import { ProjectCard } from "./ProjectCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { MobileCarousel } from "./MobileCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function ProjectShowcase() {
  const isMobile = useIsMobile();

  const projects = [
    {
      title: "LUT Lens",
      description: "A web-based tool for photographers and content creators to preview and apply Look-Up Tables (LUTs) to images in real-time. Upload images and LUT files (.cube, .3dl) to instantly see color grades applied, with download capabilities and a modern, responsive interface built on Next.js and Firebase.",
      tags: ["Next.js", "Firebase", "Web Workers", "Color Science"],
      imageUrl: "/Images/lut-lens.jpg",
      githubUrl: "https://github.com/Diffraction-Works/LUT-Lens",
      demoUrl: "https://diffraction-works.github.io/LUT-Lens/",
      hint: "photography control",
      stars: 0,
      forks: 0,
      language: "TypeScript"
    },
    {
      title: "Transfer Window Calculator",
      description: "Allows you to calculate the angle between two planets for a transfer window. An essential tool for interplanetary orbital mechanics simulations and flight planning.",
      tags: ["Orbital Mechanics", "Math", "Visualization"],
      imageUrl: "/Images/transfer-window-calculator.jpg",
      githubUrl: "https://github.com/Diffraction-Works/Transfer-Window-Calculator",
      hint: "planets space",
      stars: 0,
      forks: 0,
      language: "Python"
    },
    {
      title: "Dependable",
      description: "A comprehensive dependency health monitoring tool that scans your project dependencies and provides detailed reports on security vulnerabilities, maintenance status, license compatibility, bundle size impact, and automated update recommendations. Keep your dependencies reliable and secure.",
      tags: ["Security", "NPM", "Automation", "Health Monitoring"],
      imageUrl: "/Images/dependable.jpg",
      githubUrl: "https://github.com/Diffraction-Works/Dependable",
      hint: "code development",
      stars: 0,
      forks: 0,
      language: "JavaScript"
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
