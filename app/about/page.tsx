import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
import { ChevronRightCircleIcon } from 'lucide-react'
import React from 'react'


const page = () => {
  return (
    <MaxWidthWrapper>
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
        <div className="space-y-6">
          <p className="text-xl text-muted-foreground leading-relaxed">
            YouTubeToChapters is a YouTube video to chapter converter that uses
            AI to generate chapters from YouTube videos.
          </p>
          <div className="bg-secondary p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">How it works</h2>
            <ul className="list-disc list-inside mb-2">
              <li>Automatic chapter generation for YouTube videos</li>
              <li>Easy to use</li>
              <li>No need to manually create chapters</li>
            </ul>
          </div>
        </div>
      </div>
        <p className='font-light mt-10'>
            made by DEWANG ♥, inspired by AlfiWebDev
        </p>
    </MaxWidthWrapper>
  )
}

export default page