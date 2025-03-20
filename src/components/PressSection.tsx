import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Copy, Download, RefreshCw } from "lucide-react";
import { type ArtistData } from "./ArtistForm";
import { useToast } from "@/hooks/use-toast";
import { AnimatedText } from "./AnimatedText";
import { type OpenAIResponse } from "@/utils/openaiService";

interface PressSectionProps {
  artistData: ArtistData | null;
  generatedContent: OpenAIResponse | null;
  isGenerating: boolean;
}

export function PressSection({ artistData, generatedContent, isGenerating }: PressSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pressRelease, setPressRelease] = useState("");
  const [artistBio, setArtistBio] = useState("");

  useEffect(() => {
    // Set loading state based on isGenerating
    setLoading(isGenerating);
    
    // If we have generated content and not generating anymore, update the state
    if (generatedContent && !isGenerating) {
      setPressRelease(generatedContent.press.pressRelease);
      setArtistBio(generatedContent.press.artistBio);
    } 
    // If we don't have generated content yet, use fallback after a timeout
    else if (artistData && !generatedContent && !isGenerating) {
      // Simulate API loading
      const timer = setTimeout(() => {
        setLoading(false);
        generateFallbackContent();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [artistData, generatedContent, isGenerating]);

  const generateFallbackContent = () => {
    if (!artistData) return;
    
    // Generate press release for a band with two male lead singers
    setPressRelease(`FOR IMMEDIATE RELEASE\n\n${artistData.name}, Powerhouse Duo, Announces New ${artistData.genre} Project\n\nBringing fresh energy to the ${artistData.genre} scene, the two frontmen of ${artistData.name} are excited to announce their upcoming release that promises to captivate ${artistData.targetAudience} with their powerful vocal harmonies and authentic expression.\n\nBuilding on ${artistData.socialPresence ? `their existing presence of ${artistData.socialPresence}` : "their growing reputation"}, this release marks a significant evolution in both singers' artistic journey as a duo.\n\nStay tuned for more updates as these two vocalists continue to push boundaries in the music industry.`);
    
    // Generate artist bio for a band with two male lead singers
    setArtistBio(`${artistData.name} features two dynamic lead singers creating ${artistData.genre} music that resonates deeply with ${artistData.targetAudience}.\n\nWith complementary vocal styles that blend traditional elements of ${artistData.genre} with innovative production techniques, these two frontmen have cultivated a unique sound in today's music scene.\n\n${artistData.socialPresence ? `Already building momentum with ${artistData.socialPresence}, t` : "T"}he duo's artistic vision aims to create authentic connections through their harmonized approach, creating an immersive experience for listeners that showcases the power of their combined talent.`);
  };

  const handleCopy = (text: string, type: "press release" | "artist bio") => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `The ${type} has been copied to your clipboard`
    });
  };

  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      generateFallbackContent();
    }, 1500);
  };

  if (!artistData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">
        <AnimatedText text="AI-Powered Press & PR" gradient tag="span" />
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Press Release */}
        <AnimatedCard delay={200}>
          <div className="space-y-4 h-full flex flex-col">
            <h3 className="text-xl font-semibold">Press Release</h3>
            
            {loading ? (
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 bg-muted/20 rounded-xl border border-border">
                <pre className="text-sm whitespace-pre-wrap font-sans">{pressRelease}</pre>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-auto">
              <div className="text-sm text-muted-foreground">
                {!loading ? "Customized press release for your duo" : "Generating press release..."}
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Regenerate"
                  disabled={loading}
                  onClick={handleRegenerate}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Copy"
                  disabled={loading}
                  onClick={() => handleCopy(pressRelease, "press release")}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Download"
                  disabled={loading}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        {/* Artist Bio */}
        <AnimatedCard delay={400}>
          <div className="space-y-4 h-full flex flex-col">
            <h3 className="text-xl font-semibold">Artist Biography</h3>
            
            {loading ? (
              <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 bg-muted/20 rounded-xl border border-border">
                <pre className="text-sm whitespace-pre-wrap font-sans">{artistBio}</pre>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-auto">
              <div className="text-sm text-muted-foreground">
                {!loading ? "Audience-focused dual vocalist biography" : "Analyzing artist profile..."}
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Regenerate"
                  disabled={loading}
                  onClick={handleRegenerate}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Copy"
                  disabled={loading}
                  onClick={() => handleCopy(artistBio, "artist bio")}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Download"
                  disabled={loading}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
