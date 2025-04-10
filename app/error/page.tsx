'use client'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'


const errors = {
    subtitles_issue: "There was an issue with the subtitles. Please try again.",
    video_issue: "There was an issue with the video. Please try again.",
    failed_to_get_video_id: "Failed to get the video ID. Please try again.",
    unknown_error: "An unknown error occurred. Please try again.",
    user_not_found: "User not found. Please try again.",
    authentication_required: "Authentication is required. Please sign in.",
    invalid_youtube_link: "Invalid YouTube link. Please try again.",
    video_too_long: "Video is too long. Please try again.",
    openai_issue: "There was an issue with OpenAI. Please try again.",
  };

const Page = () => {
    const searchParam = useSearchParams()
    const error = searchParam.get('error')
    let errorMessage = errors.unknown_error;
    let errorTitle = "Unknown Error0"
    if(error){
        if(errors[error as keyof typeof errors]){
            errorMessage = errors[error as keyof typeof errors];
            errorTitle = error;
        }
    }
  return (
    <MaxWidthWrapper>
        <h1>{errorTitle}</h1>
        <Link href='/'>
            go back to home page
        </Link>
    </MaxWidthWrapper>
  )
}

export default Page