'use client'

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import Image from "next/image"

const page = () => {
  return (
    <div className="h-screen w-full text-white bg-gradient-to-bl from-black via-zinc-800 to-black ">

      <MaxWidthWrapper className="flex flex-col pt-32 gap-20">
        <div className="flex flex-col items-center gap-8 mb-12 ">
          <h1 className="font-black text-5xl">Easy timestamps for your YouTube videos.</h1>
          <p>generate timestamps for your YouTube descriptions in seconds. Built by creators for creators</p>
          <div className="flex gap-4">
            <Button className="font-semibold border">Get Started</Button>
            <Button className="font-semibold bg-sky-600 text-white">learn more</Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 h-40 ">
          {
            [
              {
                title: "AI-POWERED",
                description: "Leverage the ai to generate timestamp for your video"
              },
              {
                title: "Easy to User",
                description: "Our platform is easy to use and taskes only seconds to generate timestamps for a YT vidoe"
              },
              {
                title: "SEO-boost",
                description: "Generating timestamp for your YouTube videos can help improve your SEO."
              },
            ].map(elem => {
              return <Card className="col-span-4 bg-zinc-800 text-white">
                <CardHeader className="text-center">
                  {elem.title}
                </CardHeader>
                <CardDescription className="text-md text-center">
                  {elem.description}
                </CardDescription>
              </Card>
            })
          }
          <div className="col-span-12 flex justify-center">
            <Button className="bg-sky-600 text-white">
              <PlayCircle className="mr-4 h-6 w-6" />
              watch demo
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="h-screen w-full text-white bg-gradient-to-br from-black via-zinc-800 to-black">
        <MaxWidthWrapper>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Build by Dewang</h1>
            <p className="text-xl text-zinc-500">Learning by every-one</p>
          </div>
          <div className="w-full flex flex-col items-center gap-12">
            <Image className="rounded" src="/demoImg.jpg" alt="demoImage" height={450} width={800} />
            <Button className="border">
              play the vidoe
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}

export default page