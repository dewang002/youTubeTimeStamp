import Header from '@/components/common/Header'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ChapterWrapper from '@/components/common/ChapterWrapper'

const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!
    },
    select: {
      savedChapters: true
    }
  })

  return (
    <div>
      <Header text={`${session.user?.name || "User"} `} />
      <ChapterWrapper userData={userData} />
    </div>
  )
}

export default page