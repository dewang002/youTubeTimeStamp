'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { validation } from "@/utils/validation";
import { getVideoDetails, getVideoId, getVideoTranscript } from "@/utils/youTube";
import { ParseXmlContent } from "@/utils/parser";
import { generateAiChapters } from "@/utils/googleAi";
import { prisma } from "@/lib/prisma";

type GenerateChapter = {
    success: boolean;
    error?: string;
    data?: any
}

export const generateChapters = async (formData: FormData): Promise<GenerateChapter> => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return { success: false, error: 'not authenticated' }
    }

    const userFromDB = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })
    if (!userFromDB) {
        return {
            success: false,
            error: "not a user"
        }
    }

    const link = formData.get("link") as string
    if (!link) {
        return { success: false, error: 'link rejected' }
    }

    if (!await validation(link)) {
        return {
            success: false,
            error: "invalid yt link"
        }
    }

    const videoId = await getVideoId(link)
    if (!videoId) {
        return {
            success: false,
            error: "invalid yt link id"
        }
    }

    const videoDetail = await getVideoDetails(videoId)
    const videoTranscript = await getVideoTranscript(videoId)
    if (!videoDetail || !videoDetail.subtitles || !videoTranscript || videoTranscript.subtitles.length === 0) {
        return {
            success: false,
            error: "video issue"
        }
    }

    const lengthSeconds = typeof videoDetail.lengthSeconds === 'string' ? parseInt(videoDetail.lengthSeconds, 10) : videoDetail.lengthSeconds
    if (isNaN(lengthSeconds)) {
        return {
            success: false,
            error: "invalid video number"
        }
    }

    if (lengthSeconds > 3600) {
        return {
            success: false,
            error: "video too long"
        }
    }

    const parsedTranscription = await ParseXmlContent(videoTranscript.subtitles[0])
    if (!parsedTranscription) {
        return {
            success: false,
            error: "problem during creating timestamp"
        }
    }

    const googleAiChapter = await generateAiChapters(parsedTranscription, lengthSeconds)
    if (!googleAiChapter) {
        return {
            success: false,
            error: "googleAi issue"
        }
    }
    const saveChapter = await prisma.chapterSet.create({
        data: {
            title: videoDetail.title,
            content: googleAiChapter,
            userId: userFromDB.id,
        }
    })

    return {
        success: true,
        data: saveChapter
    }

}


