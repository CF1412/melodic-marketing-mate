
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Music, Target, Globe, ArrowRight } from "lucide-react";

interface ArtistFormProps {
  onSubmit: (data: ArtistData) => void;
}

export interface ArtistData {
  name: string;
  genre: string;
  targetAudience: string;
  socialPresence: string;
}

export function ArtistForm({ onSubmit }: ArtistFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArtistData>({
    name: "",
    genre: "",
    targetAudience: "",
    socialPresence: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.genre || !formData.targetAudience) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
      toast({
        title: "Profile created",
        description: "Your artist profile has been created successfully"
      });
    }, 1500);
  };

  return (
    <AnimatedCard className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Tell us about your music</h2>
        
        <div className="space-y-4">
          {/* Artist Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Music className="w-4 h-4" />
              Artist/Band Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. The Crystal Echoes"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Genre */}
          <div className="space-y-2">
            <label htmlFor="genre" className="text-sm font-medium flex items-center gap-2">
              <Music className="w-4 h-4" />
              Music Genre <span className="text-red-500">*</span>
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder="e.g. Indie Rock, Electronic Pop, Hip Hop"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Target Audience */}
          <div className="space-y-2">
            <label htmlFor="targetAudience" className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Target Audience <span className="text-red-500">*</span>
            </label>
            <input
              id="targetAudience"
              name="targetAudience"
              type="text"
              placeholder="e.g. 18-25, college students, urban professionals"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all"
              value={formData.targetAudience}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Social Presence */}
          <div className="space-y-2">
            <label htmlFor="socialPresence" className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Current Social/Streaming Presence <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <textarea
              id="socialPresence"
              name="socialPresence"
              placeholder="e.g. 500 Instagram followers, 1000 monthly Spotify listeners"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px]"
              value={formData.socialPresence}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" /> Processing...
              </>
            ) : (
              <>
                Create Profile <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </AnimatedCard>
  );
}
