
import { ArtistData } from "@/components/ArtistForm";

// Define types for OpenAI responses
interface OpenAIResponse {
  branding: {
    logoDescription: string;
    brandIdentity: string[];
    visualStyle: string;
  };
  socialMedia: {
    posts: Array<{
      type: string;
      caption: string;
      platform: string;
    }>;
  };
  press: {
    pressRelease: string;
    artistBio: string;
  };
  insights: {
    topLocations: string[];
    platforms: Array<{
      name: string;
      score: number;
    }>;
    playlists: string[];
    influencers: string[];
  };
}

// Function to generate a system prompt based on artist data
const generateSystemPrompt = (artistData: ArtistData): string => {
  return `You are an expert music marketing consultant. Create marketing content for a band with two male lead singers with the following details:
- Name: ${artistData.name}
- Genre: ${artistData.genre}
- Target Audience: ${artistData.targetAudience}
- Current Social Presence: ${artistData.socialPresence || "New band with minimal presence"}

Respond in JSON format with no additional explanations. Include the following sections exactly:
{
  "branding": {
    "logoDescription": "A description of appropriate branding elements",
    "brandIdentity": ["4 bullet points about visual elements"],
    "visualStyle": "A description of visual style appropriate for the genre"
  },
  "socialMedia": {
    "posts": [
      {"type": "announcement", "caption": "Full caption text featuring both vocalists", "platform": "Instagram"},
      {"type": "behindTheScenes", "caption": "Full caption text about the duo", "platform": "TikTok"},
      {"type": "engagement", "caption": "Full caption text that mentions both singers", "platform": "Instagram"}
    ]
  },
  "press": {
    "pressRelease": "Complete press release text referring to them as a duo with two frontmen",
    "artistBio": "Complete artist biography highlighting both lead singers"
  },
  "insights": {
    "topLocations": ["5 location names"],
    "platforms": [
      {"name": "Platform Name", "score": 85},
      {"name": "Platform Name", "score": 80},
      {"name": "Platform Name", "score": 75},
      {"name": "Platform Name", "score": 70},
      {"name": "Platform Name", "score": 65}
    ],
    "playlists": ["5 playlist names"],
    "influencers": ["5 influencer categories"]
  }
}`;
};

// Main function to generate all content using OpenAI API
export const generateMarketingContent = async (artistData: ArtistData, apiKey: string = ""): Promise<OpenAIResponse> => {
  try {
    // If no API key is provided, use fallback content
    if (!apiKey) {
      throw new Error("No API key provided");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using GPT-4o as specified
        messages: [
          {
            role: "system",
            content: generateSystemPrompt(artistData)
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const contentString = data.choices[0].message.content;
    
    // Parse JSON response
    try {
      return JSON.parse(contentString) as OpenAIResponse;
    } catch (e) {
      console.error("Failed to parse OpenAI response as JSON:", e);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    // Return fallback content in case of API failure
    return getFallbackContent(artistData);
  }
};

// Fallback content if API fails - updated for a band with two male lead singers
const getFallbackContent = (artistData: ArtistData): OpenAIResponse => {
  return {
    branding: {
      logoDescription: `${artistData.name} logo reflecting the dual-frontman dynamic of this ${artistData.genre} band.`,
      brandIdentity: [
        `Bold typography that emphasizes the duo's visual presence in ${artistData.genre}`,
        `Color palette: Deep blues and vibrant accents capturing the energy of both vocalists`,
        `Visual motifs that highlight the band's dual-vocal approach for ${artistData.targetAudience}`,
        `Modern, professional aesthetic that showcases both frontmen equally`
      ],
      visualStyle: `Striking visual identity that emphasizes the two lead singers while resonating with ${artistData.targetAudience}.`
    },
    socialMedia: {
      posts: [
        {
          type: "announcement",
          caption: `New single dropping this Friday! Both vocalists have poured their hearts into this one. #${artistData.genre.replace(/\s+/g, '')}`,
          platform: "Instagram"
        },
        {
          type: "behindTheScenes",
          caption: `Studio session with the guys recording vocal harmonies for the upcoming album. #${artistData.name.replace(/\s+/g, '')}`,
          platform: "TikTok"
        },
        {
          type: "engagement",
          caption: `Which of our vocalists' styles do you prefer? Comment below! #${artistData.genre.replace(/\s+/g, '')}Duo`,
          platform: "Instagram"
        }
      ]
    },
    press: {
      pressRelease: `FOR IMMEDIATE RELEASE\n\n${artistData.name}, Powerhouse Duo, Announces New ${artistData.genre} Project\n\nBringing fresh energy to the ${artistData.genre} scene, the two frontmen of ${artistData.name} are excited to announce their upcoming release that promises to captivate ${artistData.targetAudience} with their powerful vocal harmonies and authentic expression.\n\nBuilding on ${artistData.socialPresence ? `their existing presence of ${artistData.socialPresence}` : "their growing reputation"}, this release marks a significant evolution in both singers' artistic journey as a duo.\n\nStay tuned for more updates as these two vocalists continue to push boundaries in the music industry.`,
      artistBio: `${artistData.name} features two dynamic lead singers creating ${artistData.genre} music that resonates deeply with ${artistData.targetAudience}.\n\nWith complementary vocal styles that blend traditional elements of ${artistData.genre} with innovative production techniques, these two frontmen have cultivated a unique sound in today's music scene.\n\n${artistData.socialPresence ? `Already building momentum with ${artistData.socialPresence}, t` : "T"}he duo's artistic vision aims to create authentic connections through their harmonized approach, creating an immersive experience for listeners that showcases the power of their combined talent.`
    },
    insights: {
      topLocations: [
        "New York, NY",
        "Los Angeles, CA",
        "London, UK", 
        "Berlin, Germany",
        "Toronto, Canada"
      ],
      platforms: [
        { name: "Spotify", score: 85 },
        { name: "Instagram", score: 80 },
        { name: "TikTok", score: 75 },
        { name: "YouTube", score: 70 },
        { name: "SoundCloud", score: 65 }
      ],
      playlists: [
        "New Music Friday",
        "Vocal Duos Playlist",
        `Top ${artistData.genre} Duets`,
        "Viral Hits",
        "Independent Artist Spotlights"
      ],
      influencers: [
        `${artistData.genre}-specific music bloggers`,
        "Vocal coach YouTube channels",
        "Music podcasters featuring band interviews",
        "Local venue promoters",
        "Playlist curators focusing on vocal harmonies"
      ]
    }
  };
};

// Export the OpenAIResponse type for use in components
export type { OpenAIResponse };
