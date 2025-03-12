
import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Map, BarChart3, DollarSign, Share2, Users } from "lucide-react";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";

interface InsightsSectionProps {
  artistData: ArtistData | null;
}

export function InsightsSection({ artistData }: InsightsSectionProps) {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState({
    topLocations: [] as string[],
    platforms: [] as {name: string; score: number}[],
    playlists: [] as string[],
    influencers: [] as string[]
  });

  useEffect(() => {
    if (artistData) {
      // Simulate API loading
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        generateInsights();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [artistData]);

  const generateInsights = () => {
    if (!artistData) return;
    
    // Generate insights based on genre and audience
    const genre = artistData.genre.toLowerCase();
    
    // Generate location insights
    let locations = [];
    if (genre.includes('rock') || genre.includes('indie')) {
      locations = ["Austin, TX", "Brooklyn, NY", "Portland, OR", "London, UK", "Melbourne, Australia"];
    } else if (genre.includes('hip hop') || genre.includes('rap')) {
      locations = ["Atlanta, GA", "Los Angeles, CA", "Chicago, IL", "Toronto, Canada", "London, UK"];
    } else if (genre.includes('electronic') || genre.includes('dance')) {
      locations = ["Berlin, Germany", "Los Angeles, CA", "London, UK", "Amsterdam, Netherlands", "Tokyo, Japan"];
    } else if (genre.includes('pop')) {
      locations = ["Los Angeles, CA", "New York, NY", "London, UK", "Tokyo, Japan", "Seoul, South Korea"];
    } else {
      locations = ["New York, NY", "Los Angeles, CA", "London, UK", "Nashville, TN", "Berlin, Germany"];
    }
    
    // Generate platform insights
    let platforms = [];
    if (genre.includes('rock') || genre.includes('indie')) {
      platforms = [
        { name: "Bandcamp", score: 85 },
        { name: "Spotify", score: 80 },
        { name: "Instagram", score: 75 },
        { name: "TikTok", score: 65 },
        { name: "YouTube", score: 70 }
      ];
    } else if (genre.includes('hip hop') || genre.includes('rap')) {
      platforms = [
        { name: "TikTok", score: 90 },
        { name: "Instagram", score: 85 },
        { name: "Spotify", score: 80 },
        { name: "YouTube", score: 85 },
        { name: "SoundCloud", score: 70 }
      ];
    } else if (genre.includes('electronic') || genre.includes('dance')) {
      platforms = [
        { name: "SoundCloud", score: 85 },
        { name: "Spotify", score: 80 },
        { name: "TikTok", score: 80 },
        { name: "Instagram", score: 75 },
        { name: "YouTube", score: 70 }
      ];
    } else {
      platforms = [
        { name: "Spotify", score: 85 },
        { name: "Instagram", score: 80 },
        { name: "TikTok", score: 80 },
        { name: "YouTube", score: 75 },
        { name: "Facebook", score: 65 }
      ];
    }
    
    // Generate playlist insights
    let playlists = [];
    if (genre.includes('rock') || genre.includes('indie')) {
      playlists = ["Indie Rock Roadtrip", "Acoustic Afternoons", "Alternative Essentials", "Indie Viral Hits", "Rock Classics"];
    } else if (genre.includes('hip hop') || genre.includes('rap')) {
      playlists = ["Rap Caviar", "Get Turnt", "Hip Hop Controller", "Chill Beats", "The Plug"];
    } else if (genre.includes('electronic') || genre.includes('dance')) {
      playlists = ["Mint", "Dance Rising", "Electronic Focus", "Friday Cratediggers", "Dance Hits"];
    } else if (genre.includes('pop')) {
      playlists = ["Today's Top Hits", "Pop Rising", "Viral Hits", "Pop Sauce", "Teen Party"];
    } else {
      playlists = ["New Music Friday", "Discover Weekly", "Release Radar", "Genre-Specific Playlists", "Mood Playlists"];
    }
    
    // Generate influencer insights based on genre and audience
    let influencers = ["Top genre-specific Instagram accounts", "Rising TikTok creators", "Relevant podcast hosts", "Music bloggers", "Genre tastemakers"];
    
    setInsights({
      topLocations: locations,
      platforms,
      playlists,
      influencers
    });
  };

  if (!artistData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">
        <AnimatedText text="Strategic Insights & Recommendations" gradient tag="span" />
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geographic Insights */}
        <AnimatedCard delay={200}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Top Geographic Markets</h3>
              <Map className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/20 rounded-xl p-4 border border-border">
                  <div className="text-sm text-muted-foreground mb-2">Target these markets for the best growth potential:</div>
                  <ul className="space-y-2">
                    {insights.topLocations.map((location, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                        <span className="text-sm font-medium">{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Locations are based on {artistData.genre} popularity and {artistData.targetAudience} demographics
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Platform Focus */}
        <AnimatedCard delay={300}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Platform Recommendations</h3>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  {insights.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center gap-2">
                      <div className="w-24 text-sm">{platform.name}</div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${platform.score}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-medium">{platform.score}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Based on {artistData.genre} audience engagement patterns
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Budget Allocation */}
        <AnimatedCard delay={400}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Budget Allocation</h3>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <div className="text-sm font-medium mb-1">Content Creation</div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">40%</span>
                      <span className="text-xs text-muted-foreground">of budget</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <div className="text-sm font-medium mb-1">Digital Ads</div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">30%</span>
                      <span className="text-xs text-muted-foreground">of budget</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <div className="text-sm font-medium mb-1">Influencer Collabs</div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">20%</span>
                      <span className="text-xs text-muted-foreground">of budget</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <div className="text-sm font-medium mb-1">Analytics Tools</div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">10%</span>
                      <span className="text-xs text-muted-foreground">of budget</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Optimized for {artistData.genre} artist growth strategy
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Playlist & Influencer Insights */}
        <AnimatedCard delay={500}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Playlist & Influencer Strategy</h3>
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="h-48 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">Target Playlists</h4>
                  <div className="flex flex-wrap gap-2">
                    {insights.playlists.map((playlist, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {playlist}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">Influencer Categories</h4>
                  <ul className="space-y-1">
                    {insights.influencers.map((influencer, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Users className="w-3 h-3 text-accent" />
                        {influencer}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Targets aligned with {artistData.genre} and {artistData.targetAudience}
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
