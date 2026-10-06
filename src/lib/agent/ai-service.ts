import { ProductBlueprint } from "@/lib/types/blueprint";
import { AGENT_SYSTEM_PROMPT, AGENT_SCHEMA_TEMPLATE } from "./prompt";
import { getCustomBlueprintFromBrief } from "./demo-generator";

export interface GenerateBlueprintOptions {
  brief: string;
  mode?: "auto" | "demo" | "live";
  apiKey?: string;
  provider?: "gemini" | "openai";
}

export async function generateBlueprintWithAI(
  options: GenerateBlueprintOptions
): Promise<ProductBlueprint> {
  const { brief, mode = "auto", apiKey } = options;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  const shouldUseLive = (mode === "live" || (mode === "auto" && Boolean(geminiKey || openaiKey)));

  if (shouldUseLive && geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${AGENT_SYSTEM_PROMPT}\n\nClient Brief:\n"${brief}"\n\nGenerate the complete Product Blueprint strictly adhering to this JSON structure:\n${AGENT_SCHEMA_TEMPLATE}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText) as ProductBlueprint;
          if (parsed.projectTitle && parsed.userStories && parsed.techStack) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to intelligent generator", err);
    }
  }

  // Fallback / Demo Mode: return curated or dynamic blueprint adapted to brief
  return getCustomBlueprintFromBrief(brief);
}
