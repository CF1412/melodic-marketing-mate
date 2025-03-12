
import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Heart, MessageCircle, TrendingUp, Mail, BarChart4 } from "lucide-react";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";

interface EngagementSectionProps {
  artistData: ArtistData | null;
}

export function EngagementSection({ artistData }: EngagementSectionProps) {
  const [loading, setLoading] = useState(true);
  const [engagementStats, setEngagementStats] = useState({
    sentiment: 0,
    growth: 0,
    comments: [] as string[]
  });

  useEffect(() => {
    if (artistData) {
      // Simulate API loading
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        generateStats();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [artistData]);

  const generateStats = () => {
    if (!artistData) return;
    
    const sentiment = Math.floor(Math.random() * 30) + 70; // 70-99%
    const growth = Math.floor(Math.random() * 50) + 150; // 150-199%
    
    // Generate sample comments based on genre
    const genre = artistData.genre.toLowerCase();
    let comments = [];
    
    if (genre.includes('rock') || genre.includes('indie')) {
      comments = [
        "Love the raw energy in the latest track!",
        "Your sound reminds me of early indie classics with a modern twist",
        "Can't wait to see you perform live again"
      ];
    } else if (genre.includes('hip hop') || genre.includes('rap')) {
      comments = [
        "Those beats are fire 🔥",
        "Your flow is unlike anything else in the game right now",
        "Been sharing your tracks with everyone I know"
      ];
    } else if (genre.includes('electronic') || genre.includes('dance')) {
      comments = [
        "This production quality is insane!",
        "The drops in your new track are mind-blowing",
        "Your music is perfect for my workout playlist"
      ];
    } else if (genre.includes('pop')) {
      comments = [
        "So catchy! Been singing this all week",
        "Your melodies are so unique and memorable",
        "Please release more music soon!"
      ];
    } else {
      comments = [
        "Your music has helped me through some tough times",
        "Such a distinctive sound, instantly recognizable",
        "Can't stop playing your latest release on repeat"
      ];
    }
    
    setEngagementStats({
      sentiment,
      growth,
      comments
    });
  };

  if (!artistData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">
        <AnimatedText text="Fan Engagement & Sentiment Analysis" gradient tag="span" />
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Score */}
        <AnimatedCard delay={200}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Fan Sentiment</h3>
              <Heart className="w-5 h-5 text-accent" />
            </div>
            
            {loading ? (
              <div className="h-40 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 45 * engagementStats.sentiment / 100} ${2 * Math.PI * 45 * (1 - engagementStats.sentiment / 100)}`}
                      strokeDashoffset={2 * Math.PI * 45 * 0.25}
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="50"
                      fontSize="24"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="currentColor"
                      fontWeight="bold"
                    >
                      {engagementStats.sentiment}%
                    </text>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Positive sentiment analysis</p>
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Growth Projection */}
        <AnimatedCard delay={300}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Audience Growth</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="h-40 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{engagementStats.growth}%</span>
                  <span className="text-sm text-muted-foreground ml-1">growth potential</span>
                </div>
                <div className="w-full h-24 mt-4 px-4">
                  <div className="w-full h-full bg-muted/30 rounded-lg relative overflow-hidden">
                    {/* Simulated growth chart */}
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                      <path
                        d="M0,40 L0,30 C10,28 20,32 30,25 C40,18 50,15 60,20 C70,25 80,15 90,10 L100,5 L100,40 Z"
                        fill="hsl(var(--primary-foreground)/10)"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Based on current trajectory</p>
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Fan Comments */}
        <AnimatedCard delay={400}>
          <div className="space-y-4 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Fan Feedback</h3>
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            
            {loading ? (
              <div className="flex-1 h-40 flex items-center justify-center bg-muted/30 rounded-xl">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                {engagementStats.comments.map((comment, index) => (
                  <div key={index} className="p-3 rounded-xl bg-secondary/50 text-sm">
                    "{comment}"
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedCard>
        
        {/* Email Collection Preview */}
        <AnimatedCard className="md:col-span-3" delay={500}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Fan Engagement Tools</h3>
              <BarChart4 className="w-5 h-5 text-primary" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Smart Email Collection</h4>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Custom email signup forms designed for {artistData.genre} fans, with automated welcome sequences and content delivery.
                </p>
                
                <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                  />
                  <button className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm">
                    Join
                  </button>
                </div>
              </div>
              
              <div className="glass-morphism rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Fan Surveys & Feedback</h4>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  AI-powered social listening tools analyze fan comments across platforms to inform your content strategy.
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted/20 p-3 text-center">
                    <span className="text-sm font-medium">Music Analysis</span>
                  </div>
                  <div className="rounded-lg bg-muted/20 p-3 text-center">
                    <span className="text-sm font-medium">Audience Insights</span>
                  </div>
                  <div className="rounded-lg bg-muted/20 p-3 text-center">
                    <span className="text-sm font-medium">Content Feedback</span>
                  </div>
                  <div className="rounded-lg bg-muted/20 p-3 text-center">
                    <span className="text-sm font-medium">Release Planning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
