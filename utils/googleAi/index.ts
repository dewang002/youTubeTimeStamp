"use server"
import { GoogleGenAI } from "@google/genai";
import z from "zod"

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
): Promise<any> {
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
        });

        if (response && response.candidates && response.candidates.length === 0) {
            throw new Error("not response came")
        }
        const googleRes = response.candidates[0].content.parts[0].text
        const jsonString = googleRes.replace(/^```json\n/, '').replace(/\n```$/, '');
        const chaptersArray = JSON.parse(jsonString);
        const formattedChapters = chaptersArray.map(chapter => `${chapter.timestamp} ${chapter.title}`);
        return formattedChapters;
    } catch (err) {
        console.log(err)
        return null
    }
}

