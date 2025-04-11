
export async function callGeminiApi(apiKey: string, prompt: string, model: string = "gemini-2.0-flash") {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from Gemini");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export async function getTherapistResponse(apiKey: string, userFeelings: string) {
  const prompt = `
You are a compassionate AI therapist. The user is going through a breakup and has shared the following:

"${userFeelings}"

Provide a supportive and empathetic response in markdown format. Include:
1. A heading that acknowledges their feelings
2. A paragraph that validates their emotions
3. Reassurance that healing is possible
4. A personal-sounding anecdote about resilience
5. End with a message of hope

Use markdown formatting. Keep your response between 150-200 words and make it sound natural and human.
`;

  return await callGeminiApi(apiKey, prompt);
}

export async function getClosureResponse(apiKey: string, userFeelings: string) {
  const prompt = `
You are a closure specialist helping someone move on after a breakup. The user shared:

"${userFeelings}"

Create a therapeutic "unsent letter" template in markdown format that they can use to express their feelings and find closure. Include:
1. A markdown heading for the letter
2. A template with blanks to fill in (like "[Their Name]")
3. Suggested emotional phrases they can personalize
4. A brief closure ritual they can perform (like safely burning the letter)

Use markdown formatting with proper headings and structure. Keep it between 150-200 words.
`;

  return await callGeminiApi(apiKey, prompt);
}

export async function getRoutineResponse(apiKey: string, userFeelings: string) {
  const prompt = `
You are a recovery coach specialized in helping people after breakups. The user shared:

"${userFeelings}"

Create a practical 7-day recovery plan in markdown format to help them move forward. Include:
1. A main heading for the recovery plan
2. Activities for each day broken down into morning, afternoon, and evening
3. Each activity should be specific, actionable, and healing-focused
4. A small bonus section like a recommended playlist or affirmations

Use markdown formatting with headers, subheaders, lists, and bullet points. Keep it between 250-350 words.
`;

  return await callGeminiApi(apiKey, prompt);
}

export async function getHonestyResponse(apiKey: string, userFeelings: string) {
  const prompt = `
You are a direct, no-nonsense breakup coach who provides tough love. The user shared:

"${userFeelings}"

Create a candid, straight-to-the-point response in markdown format that helps them face reality. Include:
1. A bold heading about facing the truth
2. 3-4 honest observations about their situation without sugar-coating
3. A clear explanation of why moving forward is necessary
4. Specific action steps they need to take immediately

Use markdown formatting. Be direct but not cruel. Focus on growth and reality. Keep it between 200-300 words.
`;

  return await callGeminiApi(apiKey, prompt);
}
