'use client'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { describe } from "node:test"
import { title } from "process"

const page = () => {
  return (
    <div className="h-screen w-full text-white bg-gradient-to-bl from-black via-zinc-800 to-black ">
      <div className="flex flex-col items-center gap-5 mb-12">
        <h1 className="font-black text-5xl">Easy timestamps for your YouTube videos.</h1>
        <p>generate timestamps for your YouTube descriptions in seconds. Built by creators for creators</p>
        <div className="flex gap-4">
          <Button className="font-semibold border">Get Started</Button>
          <Button className="font-semibold bg-sky-600 text-white">learn more</Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 h-40">
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
      </div>
    </div>
  )
}

export default page