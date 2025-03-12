
import { type ArtistData } from "../ArtistForm";
import { LoadingSpinner } from "../LoadingSpinner";
import { Download } from "lucide-react";

interface BrandIdentityGuidelinesProps {
  artistData: ArtistData;
  loading: boolean;
  brandIdentity: string[];
}

export function BrandIdentityGuidelines({ artistData, loading, brandIdentity }: BrandIdentityGuidelinesProps) {
  return (
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
  );
}
