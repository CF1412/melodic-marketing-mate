
import { type ArtistData } from "../ArtistForm";
import { LoadingSpinner } from "../LoadingSpinner";
import { Download, RefreshCw, Share2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface LogoPreviewProps {
  artistData: ArtistData;
  loading: boolean;
  logoGenerated: boolean;
  colorScheme: string;
}

export function LogoPreview({ artistData, loading, logoGenerated, colorScheme }: LogoPreviewProps) {
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
  );
}
