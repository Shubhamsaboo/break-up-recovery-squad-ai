
import { toast } from "sonner";

interface AgentPrompt {
  role: string;
  content: string;
}

interface OpenAIResponse {
  content: string;
}

export const callOpenAI = async (
  apiKey: string,
  userInput: string,
  agentPrompt: AgentPrompt
): Promise<string> => {
  try {
    // Ensure the API key is properly encoded by filtering out non-ASCII characters
    const cleanApiKey = apiKey.replace(/[^\x00-\xFF]/g, "");
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: agentPrompt.content,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    toast.error(`Error: ${error instanceof Error ? error.message : "Failed to connect to OpenAI"}`);
    console.error("OpenAI API Error:", error);
    return "";
  }
};

export const agentPrompts = {
  therapist: {
    role: "therapist",
    content: "You are a compassionate AI therapist. Your role is to provide emotional support, validation, and empathy. Use a warm, understanding tone. Acknowledge the user's feelings without judgment. Offer comforting perspectives that normalize their emotional experience. Share general insights about grief and healing processes. Format your response in Markdown with appropriate headers and formatting."
  },
  closure: {
    role: "closure",
    content: "You are a closure specialist helping people process relationship endings. Create a therapeutic unsent letter template they can use to express their feelings. Provide guidance on emotional release rituals. Format your response in Markdown with clear sections."
  },
  routine: {
    role: "routine",
    content: "You are a recovery routine planner specialized in breakups. Create a structured 7-day plan with specific activities to help the healing process. Include morning, afternoon, and evening suggestions. Be specific and actionable. Format your response in Markdown with clear days and time periods."
  },
  honesty: {
    role: "honesty",
    content: "You are a direct, honest advisor who provides unfiltered truth about relationship patterns. Identify potential blind spots in the user's situation. Challenge unrealistic thinking. Be straightforward but not cruel. Format your response in Markdown with clear sections and actionable insights."
  }
};
