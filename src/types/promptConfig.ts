
export interface ExamplePair {
  input: {
    name: string;
    genre: string;
    targetAudience: string;
    socialPresence?: string;
  };
  output: string;
}

export interface PromptConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  examples: ExamplePair[];
}

export interface MarketingPromptConfigs {
  campaignPlanner: PromptConfig;
  socialMediaWriter: PromptConfig;
  emailBlastBuilder: PromptConfig;
  pressReleaseWriter: PromptConfig;
  brandingConsultant: PromptConfig;
}
