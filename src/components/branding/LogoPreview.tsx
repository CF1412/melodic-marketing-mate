
import { type ArtistData } from "../ArtistForm";
import { LoadingSpinner } from "../LoadingSpinner";
import { Download, RefreshCw, Share2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";

interface LogoPreviewProps {
  artistData: ArtistData;
  loading: boolean;
  logoGenerated: boolean;
  colorScheme: string;
  logoDescription?: string;
}

export function LogoPreview({ artistData, loading, logoGenerated, colorScheme, logoDescription }: LogoPreviewProps) {
  const [profileImage, setProfileImage] = useState("/lovable-uploads/7d12bed8-5ae3-4e61-8d43-eb8eebe28f14.png");
  
  const cycleProfileImage = () => {
    // Cycle between the new band images
    const images = [
      "/lovable-uploads/7d12bed8-5ae3-4e61-8d43-eb8eebe28f14.png",
      "/lovable-uploads/15161f6c-9311-4563-8128-be120c94b7ef.png",
      "/lovable-uploads/e8a58c78-84c4-4b73-bcfa-5309d221e50a.png",
      "/lovable-uploads/0ceb4efb-8dc9-4310-961c-213c6e59c552.png"
    ];
    
    const currentIndex = images.indexOf(profileImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setProfileImage(images[nextIndex]);
  };
  
  const getBackgroundClass = () => {
    switch (colorScheme) {
      case 'vibrant': return 'from-primary/20 to-accent/20';
      case 'modern': return 'from-primary/10 to-accent/10';
      case 'retro': return 'from-orange-400/20 to-purple-400/20';
      default: return 'from-gray-100/20 to-gray-300/20';
    }
  };
  
  return (
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
        <div className={`relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br ${getBackgroundClass()} transition-all duration-500`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent animate-pulse-subtle"></div>
          
          <div className="relative z-10 text-center p-8 flex flex-col items-center justify-center h-full">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 ring-2 ring-primary/20 shadow-lg">
              <img 
                src={profileImage} 
                alt={artistData.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-1">{artistData.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{artistData.genre}</p>
            
            <div className="flex gap-2 mt-4">
              {['#', '#', '#'].map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${
                    colorScheme === 'vibrant' ? 'bg-primary' : 
                    colorScheme === 'retro' ? 'bg-orange-400' : 
                    'bg-accent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {logoGenerated ? logoDescription || "Logo generated based on your dual frontmen band profile" : "Generating logo..."}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full hover:bg-secondary transition-colors" 
            aria-label="Regenerate"
            disabled={loading}
            onClick={cycleProfileImage}
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
  );
}
