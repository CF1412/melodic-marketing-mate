import { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ArtistForm, type ArtistData } from "@/components/ArtistForm";
import { BrandingSection } from "@/components/BrandingSection";
import { PressSection } from "@/components/PressSection";
import { InsightsSection } from "@/components/InsightsSection";
import { EngagementSection } from "@/components/EngagementSection";
import { ChevronDown } from "lucide-react";
import { generateMarketingContent, type OpenAIResponse } from "@/utils/openaiService";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
const Index = () => {
  const {
    toast
  } = useToast();
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<OpenAIResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("openai_api_key") || "";
  });
  const brandingSectionRef = useRef<HTMLDivElement>(null);
  const apiForm = useForm({
    defaultValues: {
      apiKey: apiKey
    }
  });
  const handleSubmit = async (data: ArtistData) => {
    setArtistData(data);
    setIsGenerating(true);
    try {
      // Generate content using OpenAI with the stored API key
      const content = await generateMarketingContent(data, apiKey);
      setGeneratedContent(content);
      toast({
        title: "Content generated successfully",
        description: "Your AI marketing content is ready!"
      });
    } catch (error) {
      toast({
        title: "Error generating content",
        description: "There was an issue connecting to the AI service. Using fallback content.",
        variant: "destructive"
      });
      console.error("Content generation error:", error);
    } finally {
      setIsGenerating(false);

      // Scroll to the branding section
      setTimeout(() => {
        brandingSectionRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }
  };
  const handleApiKeySave = (values: {
    apiKey: string;
  }) => {
    localStorage.setItem("openai_api_key", values.apiKey);
    setApiKey(values.apiKey);
    toast({
      title: "API key saved",
      description: "Your OpenAI API key has been saved to local storage."
    });
  };
  return <div className="min-h-screen w-full">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen w-full relative flex items-center justify-center px-4 md:px-8 pt-16">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 filter blur-3xl animate-float opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/10 filter blur-3xl animate-float opacity-70" style={{
          animationDelay: "1s"
        }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 py-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            AI-Powered Music Marketing
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            Your AI Marketing Copilot for <span className="gradient-text">Music Success</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>Create stunning promotional materials, strategic insights, and targeted marketing campaigns - powered by realtime streaming data.</p>
          
          <div className="animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <ArtistForm onSubmit={handleSubmit} />
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>
      
      {/* Results Sections */}
      {artistData && <div className="py-16 px-4 md:px-8 space-y-24 max-w-6xl mx-auto">
          {/* Branding Section */}
          <section ref={brandingSectionRef}>
            <BrandingSection artistData={artistData} generatedContent={generatedContent} isGenerating={isGenerating} />
          </section>
          
          {/* Press Section */}
          <section>
            <PressSection artistData={artistData} generatedContent={generatedContent} isGenerating={isGenerating} />
          </section>
          
          {/* Insights Section */}
          <section>
            <InsightsSection artistData={artistData} generatedContent={generatedContent} isGenerating={isGenerating} />
          </section>
          
          {/* Engagement Section */}
          <section>
            <EngagementSection artistData={artistData} />
          </section>
        </div>}
      
      {/* API Key Section */}
      <section className="py-12 px-4 md:px-8 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">OpenAI API Settings</h2>
            <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(handleApiKeySave)} className="space-y-4">
                <FormField control={apiForm.control} name="apiKey" render={({
                field
              }) => <FormItem>
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="sk-..." type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your API key will be stored in your browser's local storage.
                      </FormDescription>
                    </FormItem>} />
                <Button type="submit">Save API Key</Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Music Copilot</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                
              </a>
              
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Music Copilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;