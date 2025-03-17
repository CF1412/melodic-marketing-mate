
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
  return `You are an expert music marketing consultant. Create marketing content for an artist with the following details:
- Name: ${artistData.name}
- Genre: ${artistData.genre}
- Target Audience: ${artistData.targetAudience}
- Current Social Presence: ${artistData.socialPresence || "New artist with minimal presence"}

Respond in JSON format with no additional explanations. Include the following sections exactly:
{
  "branding": {
    "logoDescription": "A description of appropriate branding elements",
    "brandIdentity": ["4 bullet points about visual elements"],
    "visualStyle": "A description of visual style appropriate for the genre"
  },
  "socialMedia": {
    "posts": [
      {"type": "announcement", "caption": "Full caption text", "platform": "Instagram"},
      {"type": "behindTheScenes", "caption": "Full caption text", "platform": "TikTok"},
      {"type": "engagement", "caption": "Full caption text", "platform": "Instagram"}
    ]
  },
  "press": {
    "pressRelease": "Complete press release text",
    "artistBio": "Complete artist biography"
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
export const generateMarketingContent = async (artistData: ArtistData): Promise<OpenAIResponse> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // In a production app, you would use environment variables or secure storage
        // This is just for demonstration purposes
        "Authorization": `Bearer YOUR_OPENAI_API_KEY_HERE` 
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

// Fallback content if API fails
const getFallbackContent = (artistData: ArtistData): OpenAIResponse => {
  return {
    branding: {
      logoDescription: `${artistData.name} logo with elements that reflect ${artistData.genre} music.`,
      brandIdentity: [
        `Clean, minimalist typography with subtle ${artistData.genre} visual elements`,
        `Color palette: Deep blues and vibrant accents reflecting ${artistData.genre} energy`,
        `Visual motifs that appeal to ${artistData.targetAudience}`,
        `Modern, professional aesthetic with artistic flair`
      ],
      visualStyle: `Modern and clean visual identity that resonates with ${artistData.targetAudience}.`
    },
    socialMedia: {
      posts: [
        {
          type: "announcement",
          caption: `New single dropping this Friday! #${artistData.genre.replace(/\s+/g, '')}`,
          platform: "Instagram"
        },
        {
          type: "behindTheScenes",
          caption: `Spinning some vinyl inspiration for the upcoming album #${artistData.name.replace(/\s+/g, '')}`,
          platform: "TikTok"
        },
        {
          type: "engagement",
          caption: `What song should we cover next? Drop your suggestions below! #${artistData.genre.replace(/\s+/g, '')}`,
          platform: "Instagram"
        }
      ]
    },
    press: {
      pressRelease: `FOR IMMEDIATE RELEASE\n\n${artistData.name} Announces New ${artistData.genre} Project\n\nBringing fresh energy to the ${artistData.genre} scene, ${artistData.name} is excited to announce their upcoming release that promises to captivate ${artistData.targetAudience} with its innovative sound and authentic expression.\n\nBuilding on ${artistData.socialPresence ? `their existing presence of ${artistData.socialPresence}` : "their growing reputation"}, this release marks a significant evolution in their artistic journey.\n\nStay tuned for more updates as ${artistData.name} continues to push boundaries in the music industry.`,
      artistBio: `${artistData.name} is an emerging force in the ${artistData.genre} landscape, creating music that resonates deeply with ${artistData.targetAudience}.\n\nWith a distinctive sound that blends traditional elements of ${artistData.genre} with innovative production techniques, ${artistData.name} has cultivated a unique voice in today's music scene.\n\n${artistData.socialPresence ? `Already building momentum with ${artistData.socialPresence}, t` : "T"}heir artistic vision aims to create authentic connections through sound, creating an immersive experience for listeners that transcends conventional genre boundaries.`
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
        "Genre-Specific Playlists",
        "Mood Playlists",
        "Viral Hits",
        "Independent Artist Spotlights"
      ],
      influencers: [
        "Genre-specific music bloggers",
        "Micro-influencers in your target audience demographic",
        "Music podcasters",
        "Local venue promoters",
        "Playlist curators"
      ]
    }
  };
};

// Export the OpenAIResponse type for use in components
export type { OpenAIResponse };
