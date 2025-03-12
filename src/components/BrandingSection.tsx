import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Image, Download, Share2, RefreshCw, Info, Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface BrandingSectionProps {
  artistData: ArtistData | null;
}

export function BrandingSection({ artistData }: BrandingSectionProps) {
  const [loading, setLoading] = useState(true);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [colorScheme, setColorScheme] = useState("modern");
  const [designStyle, setDesignStyle] = useState("minimal");
  const [brandIdentity, setBrandIdentity] = useState<string[]>([]);

  useEffect(() => {
    if (artistData) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setLogoGenerated(true);
        setBrandIdentity([
          `Clean, minimalist typography with subtle ${artistData.genre} visual elements`,
          `Color palette: Deep blues and vibrant accents reflecting ${artistData.genre} energy`,
          `Visual motifs that appeal to ${artistData.targetAudience}`,
          `Modern, professional aesthetic with artistic flair`
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [artistData]);

  if (!artistData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          <AnimatedText text="AI-Generated Branding" gradient tag="span" />
        </h2>
        
        <div className="flex gap-4">
          <Select value={colorScheme} onValueChange={setColorScheme}>
            <SelectTrigger className="w-[140px]">
              <Palette className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Color Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern & Clean</SelectItem>
              <SelectItem value="vibrant">Vibrant & Bold</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="retro">Retro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={designStyle} onValueChange={setDesignStyle}>
            <SelectTrigger className="w-[140px]">
              <Image className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Design Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="geometric">Geometric</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedCard delay={200}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Logo & Visual Identity</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI-generated logo based on your genre and style preferences</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {loading ? (
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className={`relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br transition-all duration-500 ${
                colorScheme === 'vibrant' ? 'from-primary/20 to-accent/20' :
                colorScheme === 'modern' ? 'from-primary/10 to-accent/10' :
                colorScheme === 'retro' ? 'from-orange-400/20 to-purple-400/20' :
                'from-gray-100/20 to-gray-300/20'
              }`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent animate-pulse-subtle"></div>
                <div className="relative z-10 text-center p-8">
                  <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-4">
                    <span className="text-white text-2xl font-bold">
                      {artistData.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{artistData.name}</h3>
                  <p className="text-sm text-muted-foreground">{artistData.genre}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {logoGenerated ? "Logo generated based on your profile" : "Generating logo..."}
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Regenerate"
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Download"
                  disabled={loading}
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Share"
                  disabled={loading}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={400}>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Brand Identity Guidelines</h3>
            
            {loading ? (
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="rounded-xl border border-border p-4 h-64 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Brand Voice</h4>
                    <p className="text-sm">{`${artistData.name} embodies ${artistData.genre} vibes with an authentic, ${artistData.genre.includes('Rock') ? 'edgy' : artistData.genre.includes('Pop') ? 'upbeat' : 'distinctive'} voice that resonates with ${artistData.targetAudience}.`}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Visual Elements</h4>
                    <ul className="text-sm space-y-2 pl-4">
                      {brandIdentity.map((item, i) => (
                        <li key={i} className="list-disc list-outside">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Target Platforms</h4>
                    <p className="text-sm">Optimized for Instagram, TikTok, and Spotify - the key platforms for reaching {artistData.targetAudience}.</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {!loading ? "Brand guidelines customized for your audience" : "Analyzing genre and audience..."}
              </div>
              
              <button 
                className="p-2 rounded-full hover:bg-secondary transition-colors" 
                aria-label="Download Guidelines"
                disabled={loading}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard className="md:col-span-2" delay={600}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Social Media Content</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview how your brand looks across different platforms</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {loading ? (
              <div className="h-44 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  {[1, 2, 3, 4].map((item) => (
                    <div 
                      key={item}
                      className="min-w-[300px] aspect-square rounded-xl overflow-hidden snap-center relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 flex items-center justify-center ${
                        colorScheme === 'vibrant' ? 'from-primary/20 to-accent/20' :
                        colorScheme === 'modern' ? 'from-primary/10 to-accent/10' :
                        colorScheme === 'retro' ? 'from-orange-400/20 to-purple-400/20' :
                        'from-gray-100/20 to-gray-300/20'
                      }`}>
                        <Image className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 glass-morphism opacity-0 group-hover:opacity-100 transition-opacity">
                        <h4 className="text-sm font-medium truncate">
                          {item === 1 ? `New release by ${artistData.name}` :
                           item === 2 ? `Behind the scenes` :
                           item === 3 ? `Live performance` :
                           `Fan spotlight`}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 -left-4">
                  <button className="p-2 rounded-full bg-background/80 backdrop-blur shadow-lg">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 -right-4">
                  <button className="p-2 rounded-full bg-background/80 backdrop-blur shadow-lg">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
