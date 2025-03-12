
import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";
import { StyleControls } from "./branding/StyleControls";
import { LogoPreview } from "./branding/LogoPreview";
import { BrandIdentityGuidelines } from "./branding/BrandIdentityGuidelines";
import { SocialMediaPreviews } from "./branding/SocialMediaPreviews";

interface BrandingSectionProps {
  artistData: ArtistData | null;
}

export function BrandingSection({ artistData }: BrandingSectionProps) {
  const [loading, setLoading] = useState(true);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [colorScheme, setColorScheme] = useState("modern");
  const [designStyle, setDesignStyle] = useState("minimal");
  const [brandIdentity, setBrandIdentity] = useState<string[]>([]);

  useEffect(() => {
    if (artistData) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setLogoGenerated(true);
        setBrandIdentity([
          `Clean, minimalist typography with subtle ${artistData.genre} visual elements`,
          `Color palette: Deep blues and vibrant accents reflecting ${artistData.genre} energy`,
          `Visual motifs that appeal to ${artistData.targetAudience}`,
          `Modern, professional aesthetic with artistic flair`
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [artistData]);

  if (!artistData) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          <AnimatedText text="AI-Generated Branding" gradient tag="span" />
        </h2>
        
        <StyleControls
          colorScheme={colorScheme}
          designStyle={designStyle}
          onColorSchemeChange={setColorScheme}
          onDesignStyleChange={setDesignStyle}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedCard delay={200}>
          <LogoPreview
            artistData={artistData}
            loading={loading}
            logoGenerated={logoGenerated}
            colorScheme={colorScheme}
          />
        </AnimatedCard>
        
        <AnimatedCard delay={400}>
          <BrandIdentityGuidelines
            artistData={artistData}
            loading={loading}
            brandIdentity={brandIdentity}
          />
        </AnimatedCard>
        
        <AnimatedCard className="md:col-span-2" delay={600}>
          <SocialMediaPreviews
            artistData={artistData}
            loading={loading}
            colorScheme={colorScheme}
          />
        </AnimatedCard>
      </div>
    </div>
  );
}
