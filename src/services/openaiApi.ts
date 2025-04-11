
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
  agentPrompt: AgentPrompt,
  images: File[] = []
): Promise<string> => {
  try {
    // Ensure the API key is properly encoded by filtering out non-ASCII characters
    const cleanApiKey = apiKey.replace(/[^\x00-\xFF]/g, "");
    
    // Format the message content based on whether images are included
    const userMessage: any = { role: "user" };
    
    if (images.length > 0) {
      // If we have images, we need to format the content as an array of objects
      userMessage.content = [
        { type: "text", text: userInput }
      ];
      
      // Process each image and add it to the content array
      for (const image of images) {
        try {
          const base64Image = await convertImageToBase64(image);
          userMessage.content.push({
            type: "image_url",
            image_url: {
              url: `data:${image.type};base64,${base64Image}`
            }
          });
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error(`Failed to process image: ${image.name}`);
        }
      }
      
      console.log("Sending message with images:", images.length);
    } else {
      // If no images, just use the text content directly
      userMessage.content = userInput;
    }
    
    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: agentPrompt.content,
        },
        userMessage
      ],
      temperature: 0.7,
    };
    
    console.log("Sending payload:", JSON.stringify(payload, null, 2));
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanApiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error Response:", error);
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

// Helper function to convert an image file to base64
const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Extract just the base64 part by removing the data URL prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
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
