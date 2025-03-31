'use server'

import { getServerSession } from "next-auth";

type GenerateChapter = {
    success: boolean;
    error?: string;
    data?: any
}

export const generateChapters = async (formData): Promise<GenerateChapter> => {
    const session = await getServerSession()
    if (!session?.user?.email) {
        return { success: false, error: 'not authenticated' }
    }

    const link = formData.get("link") as string
    if (!link) {
        return { success: false, error: 'link rejected' }
    }
}