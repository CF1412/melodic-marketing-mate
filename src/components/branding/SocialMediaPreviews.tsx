
import { type ArtistData } from "../ArtistForm";
import { LoadingSpinner } from "../LoadingSpinner";
import { RefreshCw, Info, ChevronLeft, ChevronRight, Instagram, Music, Mic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";

interface SocialMediaPreviewsProps {
  artistData: ArtistData;
  loading: boolean;
  colorScheme: string;
}

export function SocialMediaPreviews({ artistData, loading, colorScheme }: SocialMediaPreviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const socialImages = [
    "/lovable-uploads/03dd1caf-71d4-45dd-95af-8ab1b8ee032c.png", // Singer with mic
    "/lovable-uploads/4e35287a-17d3-45ee-8d34-a940239c4acb.png", // Vinyl record
    "/lovable-uploads/92c79ba2-3323-4376-84f0-ccf7433bf77f.png", // Person with headphones
    "/lovable-uploads/58961d41-81d2-4499-b2e4-bc89c72c4ecd.png", // Concert silhouette
    "/lovable-uploads/038445d3-b563-4c0e-8e2e-39646e9138ca.png", // DJ with vinyl
    "/lovable-uploads/c42d2bcd-adae-49de-bfb9-96d1208d6621.png", // Person recording podcast
  ];
  
  const socialCaptions = [
    `New single dropping this Friday! #${artistData.genre.replace(/\s+/g, '')}`,
    `Spinning some vinyl inspiration for the upcoming album #${artistData.name.replace(/\s+/g, '')}`,
    `Playlist curated for my amazing fans! Link in bio #Music${artistData.genre.replace(/\s+/g, '')}`,
    `Last night's show was incredible! Thanks ${artistData.targetAudience || 'everyone'} for coming out!`,
    `Behind the decks working on new tracks #StudioLife`,
    `Recording session for the new podcast episode #BehindTheMusic`
  ];
  
  const socialPlatforms = [
    { name: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { name: "TikTok", icon: <Music className="w-4 h-4" /> },
    { name: "Spotify", icon: <Music className="w-4 h-4" /> },
    { name: "YouTube", icon: <Mic className="w-4 h-4" /> }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.ceil(socialImages.length / 2) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(socialImages.length / 2) - 1 : prevIndex - 1
    );
  };

  const getVisibleImages = () => {
    const startIdx = currentIndex * 2;
    return socialImages.slice(startIdx, startIdx + 2);
  };

  const getVisibleCaptions = () => {
    const startIdx = currentIndex * 2;
    return socialCaptions.slice(startIdx, startIdx + 2);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getVisibleImages().map((image, idx) => {
              const captionIndex = currentIndex * 2 + idx;
              const platform = socialPlatforms[captionIndex % socialPlatforms.length];
              
              return (
                <div 
                  key={idx}
                  className="aspect-square rounded-xl overflow-hidden relative group"
                >
                  <img 
                    src={image} 
                    alt={`Social media preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70`}></div>
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
                    {platform.icon}
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {artistData.name.split(' ').map(word => word[0]).join('')}
                      </div>
                      <p className="text-sm font-medium">{artistData.name}</p>
                    </div>
                    <p className="text-sm">{getVisibleCaptions()[idx]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            className="absolute top-1/2 -translate-y-1/2 -left-3 p-2 rounded-full bg-background/80 backdrop-blur shadow-lg hover:bg-background/90 transition-colors"
            onClick={handlePrev}
            aria-label="Previous post"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            className="absolute top-1/2 -translate-y-1/2 -right-3 p-2 rounded-full bg-background/80 backdrop-blur shadow-lg hover:bg-background/90 transition-colors"
            onClick={handleNext}
            aria-label="Next post"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="flex justify-center gap-1">
        {Array.from({ length: Math.ceil(socialImages.length / 2) }).map((_, idx) => (
          <button 
            key={idx}
            className={`w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
