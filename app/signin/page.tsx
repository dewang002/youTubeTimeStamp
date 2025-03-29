"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function page() {
  return (
    <div className='relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-800 to-black'>
      <Button onClick={ () => signIn("discord", {callbackUrl: "/dashboard"}) } className="bg-sky-700 text-white">
          login with Discord
      </Button>
    </div>
  )
}