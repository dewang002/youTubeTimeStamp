import Header from '@/components/common/Header'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ChapterWrapper from '@/components/ChapterWrapper'
import { createCheckOutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/utils/stripe'
import Link from 'next/link'

const page = async () => {
  const session = await getServerSession(authOptions)
  await createCustomerIfNull()
  if (!session) {
    redirect("/signin")
  }

  const subscribed = await hasSubscription()
  const userData = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!
    },
    select: {
      savedChapters: true,
      stripe_customer_id: true
    }
  })

  const manage_link = await generateCustomerPortalLink("" + userData?.stripe_customer_id)
  const checkout_link = await createCheckOutLink(""+ userData?.stripe_customer_id)

  return (
    <div>
      <div className='flex justify-end'>
      {
        !subscribed.isSubscribed && (
          <Link className='border border-black bg-gradient-to-br from-black via-zinc-500 to-black  text-white p-1 rounded' href={"" + manage_link}>
            Manage subscription
          </Link>
        )
      }
      <Header text={`${session.user?.name || "User"} `} />
      </div>
      <ChapterWrapper userData={userData} />
    </div>
  )
}

export default page