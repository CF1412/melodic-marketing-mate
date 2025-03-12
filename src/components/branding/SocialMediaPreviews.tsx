
import { type ArtistData } from "../ArtistForm";
import { LoadingSpinner } from "../LoadingSpinner";
import { Image, RefreshCw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SocialMediaPreviewsProps {
  artistData: ArtistData;
  loading: boolean;
  colorScheme: string;
}

export function SocialMediaPreviews({ artistData, loading, colorScheme }: SocialMediaPreviewsProps) {
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
  );
}
