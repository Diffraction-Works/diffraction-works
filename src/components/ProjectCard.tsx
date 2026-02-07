import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, GitFork, Circle, ArrowUpRight } from "lucide-react";
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
    <Card className="group overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 card-glow h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={450}
          unoptimized
          className="object-cover transition-all duration-700 group-hover:scale-110"
          data-ai-hint={hint}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-code text-muted-foreground opacity-80">diffraction-works/{title.toLowerCase().replace(/\\s+/g, '-')}</span>
        </div>
        
        <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        <p className="font-body text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors cursor-default">
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
          <div className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Star className="w-3 h-3" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-foreground transition-colors">
            <GitFork className="w-3 h-3" />
            <span>{forks}</span>
          </div>
        </div>
        <Link 
          href={githubUrl} 
          target="_blank" 
          className="font-headline font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-1 group/link"
        >
          View Source 
          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
