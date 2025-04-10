"use server"
import { GoogleGenAI } from "@google/genai";
import z from "zod"

// Define interfaces for the Google GenAI response structure
interface ContentPart {
  text?: string;
  [key: string]: any;
}

interface Content {
  parts: ContentPart[];
  role?: string;
  [key: string]: any;
}

interface Candidate {
  content: Content;
  finishReason?: string;
  index?: number;
  [key: string]: any;
}

interface GenerateContentResponse {
  candidates: Candidate[];
  promptFeedback?: any;
  [key: string]: any;
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const ChapterSchema = z.object({
    chapters: z.array(z.string()),
});

export async function generateAiChapters(
    parsedTranscription: {
        text: string;
        timeStamp: string;
    }[],
    length: number
): Promise<string[] | null> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate chapters / timestamps for a video based on the following array of objects where each object represents a sentence.
             Each timestamp / chapter should summarise a section of the video. Your job is to find the natural stopping points for the video 
             based on the transcript. You MUST include timestamps in your response for each chapter. The length of the video is ${length} seconds. 
             The timestamps should not exceed the length of the video. The timestamps should be in the following format: [00:00].
             The transcript is as follows: ${parsedTranscription.map(({ text, timeStamp }) => `${timeStamp} - ${text}`).join("/n")}
             Please generate chapters with timestamps based on the following transcript. Format the response as a JSON array of objects, each containing a "title" and a "timestamp" in the format [MM:SS].
             And also the zod schema for it look like this ${ChapterSchema}
             `,
        }) as unknown as GenerateContentResponse;

        if (!response || !response.candidates || response.candidates.length === 0) {
            throw new Error("No response received");
        }
        
        const candidate = response.candidates[0];
        if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
            throw new Error("Response content is missing");
        }

        const textPart = candidate.content.parts[0];
        if (!textPart.text) {
            throw new Error("Response text is empty");
        }
        
        const jsonString = textPart.text.replace(/^```json\n/, '').replace(/\n```$/, '');
        
        interface Chapter {
            timestamp: string;
            title: string;
        }
        
        const chaptersArray = JSON.parse(jsonString) as Chapter[];
        const formattedChapters = chaptersArray.map((chapter) => 
            `${chapter.timestamp} ${chapter.title}`
        );
        
        return formattedChapters;
    } catch (err) {
        console.log(err);
        return null;
    }
}