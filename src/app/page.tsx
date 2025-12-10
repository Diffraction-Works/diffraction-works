
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { PhotographyFeed } from "@/components/PhotographyFeed";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ProjectShowcase />
      <PhotographyFeed />
      <ContactSection />
      <Footer />
    </main>
  );
}
