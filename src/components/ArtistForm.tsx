import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCard } from "./AnimatedCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { Music, Target, Globe, ArrowRight, Mail, Lock } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";

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
  const { signUp, signIn, user } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState<ArtistData & { email: string; password: string }>({
    email: "",
    password: "",
    name: "",
    genre: "",
    targetAudience: "",
    socialPresence: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchExistingProfile = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (profile) {
        setFormData(prev => ({
          ...prev,
          name: profile.name,
          genre: profile.genre,
          targetAudience: profile.target_audience,
          socialPresence: profile.social_presence || ''
        }));
        onSubmit({
          name: profile.name,
          genre: profile.genre,
          targetAudience: profile.target_audience,
          socialPresence: profile.social_presence || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
        await fetchExistingProfile();
      } else {
        if (!formData.name || !formData.genre || !formData.targetAudience || !formData.password) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        await signUp(formData.email, formData.password);
        
        setTimeout(async () => {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { error: profileError } = await supabase.from('profiles').update({
              name: formData.name,
              genre: formData.genre,
              target_audience: formData.targetAudience,
              social_presence: formData.socialPresence,
            }).eq('id', session.user.id);

            if (profileError) {
              console.error('Error updating profile:', profileError);
              toast({
                title: "Profile update error",
                description: profileError.message,
                variant: "destructive"
              });
            } else {
              onSubmit({
                name: formData.name,
                genre: formData.genre,
                targetAudience: formData.targetAudience,
                socialPresence: formData.socialPresence
              });

              toast({
                title: "Profile created",
                description: "Your artist profile has been created successfully"
              });
            }
          }
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedCard className="max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-sm"
        >
          {isSignIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">
          {isSignIn ? "Welcome Back!" : "Tell us about your music"}
        </h2>
        
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full p-3 rounded-xl border bg-background/50 focus:ring-2 focus:ring-primary/50 transition-all"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          {!isSignIn && (
            <>
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
            </>
          )}
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
                {isSignIn ? "Sign In" : "Create Profile"} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </AnimatedCard>
  );
}
