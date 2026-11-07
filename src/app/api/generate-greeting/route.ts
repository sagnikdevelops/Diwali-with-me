import { NextRequest, NextResponse } from "next/server";
import { findCuratedGreeting } from "@/config/ai-fallbacks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipient = String(body.recipient || "Friend").slice(0, 50);
    const language = String(body.language || "English").slice(0, 30);
    const tone = String(body.tone || "Warm & Heartfelt").slice(0, 40);
    const relationship = String(body.relationship || "Family").slice(0, 40);
    const theme = String(body.theme || "").slice(0, 100);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful verified zero-cost fallback
      const curated = findCuratedGreeting(recipient, language, tone, relationship);
      return NextResponse.json({
        success: true,
        message: curated.message,
        blessing: curated.blessing,
        source: "curated_fallback",
        note: "Generated using built-in festive catalog. Configure GEMINI_API_KEY in .env for live Gemini AI generation.",
      });
    }

    // Call Google Gemini API (verified free tier)
    const prompt = `You are a warm, poetic, and culturally sensitive Diwali greeting copywriter.
Generate a personalized Diwali greeting for:
- Recipient: ${recipient}
- Relationship: ${relationship}
- Tone: ${tone}
- Language: ${language}
${theme ? `- Specific Theme/Wishes: ${theme}` : ""}

Output strictly a JSON object with two keys:
1. "message": A 2-4 sentence beautiful, culturally authentic Diwali greeting matching the specified language and tone.
2. "blessing": A short, memorable celebratory sign-off or blessing (e.g. "Shubh Deepavali!", "शुभ दीपावली!", etc.).

Do not wrap in markdown or backticks. Return pure JSON only.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn("Gemini API call failed with status:", response.status);
      const curated = findCuratedGreeting(recipient, language, tone, relationship);
      return NextResponse.json({
        success: true,
        message: curated.message,
        blessing: curated.blessing,
        source: "curated_fallback",
        note: "Gemini API temporarily unavailable or quota reached. Loaded high-quality festive fallback.",
      });
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Empty response from AI model");
    }

    // Clean any markdown formatting if present
    const cleanedJson = candidateText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedJson);

    return NextResponse.json({
      success: true,
      message: parsed.message || candidateText,
      blessing: parsed.blessing || "Shubh Deepavali!",
      source: "gemini_ai",
    });
  } catch (error) {
    console.error("AI Greeting API error:", error);
    // Safe graceful degradation
    const curated = findCuratedGreeting("Friend", "English", "Warm & Heartfelt", "Family");
    return NextResponse.json({
      success: true,
      message: curated.message,
      blessing: curated.blessing,
      source: "curated_fallback",
      error: "Switched to verified offline catalog.",
    });
  }
}
