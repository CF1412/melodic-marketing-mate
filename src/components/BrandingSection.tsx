
import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Download, Share2, RefreshCw, Image } from "lucide-react";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";

interface BrandingSectionProps {
  artistData: ArtistData | null;
}

export function BrandingSection({ artistData }: BrandingSectionProps) {
  const [loading, setLoading] = useState(true);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [brandIdentity, setBrandIdentity] = useState<string[]>([]);

  useEffect(() => {
    if (artistData) {
      // Simulate API loading
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
      <h2 className="text-2xl font-bold mb-4">
        <AnimatedText text="AI-Generated Branding" gradient tag="span" />
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Logo Section */}
        <AnimatedCard delay={200}>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Logo & Visual Identity</h3>
            
            {loading ? (
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
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
        
        {/* Brand Identity Section */}
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
        
        {/* Social Media Content Preview */}
        <AnimatedCard className="md:col-span-2" delay={600}>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Social Media Content</h3>
            
            {loading ? (
              <div className="h-44 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 glass-morphism opacity-0 group-hover:opacity-100 transition-opacity">
                      <h4 className="text-xs font-medium truncate">
                        {item === 1 
                          ? `New release by ${artistData.name}` 
                          : item === 2 
                            ? `Behind the scenes - ${artistData.name}`
                            : `${artistData.name} live experience`}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {!loading ? "AI-generated content templates" : "Designing social posts..."}
              </div>
              
              <button 
                className="px-4 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                disabled={loading}
              >
                Generate More Content
              </button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
