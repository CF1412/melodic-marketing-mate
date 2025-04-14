
import { useState, useEffect } from "react";
import { AnimatedCard } from "./AnimatedCard";
import { type ArtistData } from "./ArtistForm";
import { AnimatedText } from "./AnimatedText";
import { StyleControls } from "./branding/StyleControls";
import { LogoPreview } from "./branding/LogoPreview";
import { BrandIdentityGuidelines } from "./branding/BrandIdentityGuidelines";
import { SocialMediaPreviews } from "./branding/SocialMediaPreviews";
import { CreativeBriefEditor } from "./branding/CreativeBriefEditor";
import { generateCreativeBrief, type OpenAIResponse } from "@/utils/openaiService";
import { type CreativeBriefOutput } from "@/types/promptConfig";
import { useToast } from "@/hooks/use-toast";

interface BrandingSectionProps {
  artistData: ArtistData | null;
  generatedContent: OpenAIResponse | null;
  isGenerating: boolean;
}

export function BrandingSection({ artistData, generatedContent, isGenerating }: BrandingSectionProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [logoGenerated, setLogoGenerated] = useState(false);
  const [colorScheme, setColorScheme] = useState("modern");
  const [designStyle, setDesignStyle] = useState("minimal");
  const [brandIdentity, setBrandIdentity] = useState<string[]>([]);
  const [creativeBrief, setCreativeBrief] = useState<CreativeBriefOutput | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  useEffect(() => {
    setLoading(isGenerating);
    
    if (generatedContent && !isGenerating) {
      setLogoGenerated(true);
      setBrandIdentity(generatedContent.branding.brandIdentity);
      if (generatedContent.branding.creativeBrief) {
        setCreativeBrief(generatedContent.branding.creativeBrief);
      }
    } 
  }, [artistData, generatedContent, isGenerating]);

  const handleRegenerateBrief = async () => {
    if (!artistData) return;
    
    setIsGeneratingBrief(true);
    try {
      const apiKey = localStorage.getItem("openai_api_key");
      if (!apiKey) {
        throw new Error("OpenAI API key not found");
      }
      
      const newBrief = await generateCreativeBrief(artistData, apiKey);
      setCreativeBrief(newBrief);
      
      toast({
        title: "Creative brief regenerated",
        description: "Your new creative direction is ready",
      });
    } catch (error) {
      console.error("Error regenerating brief:", error);
      toast({
        title: "Error regenerating brief",
        description: "There was an error generating new creative direction",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  const handleEditBrief = (editedBrief: CreativeBriefOutput) => {
    setCreativeBrief(editedBrief);
    toast({
      title: "Creative brief updated",
      description: "Your changes have been saved",
    });
  };

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
        <AnimatedCard delay={100}>
          <CreativeBriefEditor
            brief={creativeBrief}
            isLoading={isGeneratingBrief}
            onRegenerate={handleRegenerateBrief}
            onEdit={handleEditBrief}
          />
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <LogoPreview
            artistData={artistData}
            loading={loading}
            logoGenerated={logoGenerated}
            colorScheme={colorScheme}
            logoDescription={generatedContent?.branding.logoDescription}
            creativeBrief={creativeBrief}
          />
        </AnimatedCard>
        
        <AnimatedCard delay={300}>
          <BrandIdentityGuidelines
            artistData={artistData}
            loading={loading}
            brandIdentity={brandIdentity}
          />
        </AnimatedCard>
        
        <AnimatedCard className="md:col-span-2" delay={400}>
          <SocialMediaPreviews
            artistData={artistData}
            loading={loading}
            colorScheme={colorScheme}
            socialPosts={generatedContent?.socialMedia.posts}
            creativeBrief={creativeBrief}
          />
        </AnimatedCard>
      </div>
    </div>
  );
}
