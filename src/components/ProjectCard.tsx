
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, GitFork, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  hint: string;
  stars?: number;
  forks?: number;
  language: string;
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  githubUrl, 
  demoUrl, 
  hint,
  stars = 0,
  forks = 0,
  language
}: ProjectCardProps) {
  const languageColors: Record<string, string> = {
    "TypeScript": "text-blue-400 fill-blue-400",
    "JavaScript": "text-yellow-400 fill-yellow-400",
    "Python": "text-blue-500 fill-blue-500",
  };

  const langColor = languageColors[language] || "text-primary fill-primary";

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint={hint}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <Link
            href={githubUrl}
            target="_blank"
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            title="View Code"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Github className="w-6 h-6" />
            </div>
          </Link>
          {demoUrl && (
            <Link
              href={demoUrl}
              target="_blank"
              className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
              title="Live Demo"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <ExternalLink className="w-6 h-6" />
              </div>
            </Link>
          )}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-code text-muted-foreground opacity-80">diffraction-works/{title.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        
        <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="font-body text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] font-bold uppercase tracking-wider">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Circle className={cn("w-2 h-2", langColor)} />
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            <span>{forks}</span>
          </div>
        </div>
        <Link 
          href={githubUrl} 
          target="_blank" 
          className="font-headline font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-1"
        >
          View Source <ExternalLink className="w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
