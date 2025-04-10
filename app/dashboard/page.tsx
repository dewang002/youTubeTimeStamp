import Header from '@/components/common/Header'
import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation'
import prisma  from '@/lib/prisma'
import ChapterWrapper from '@/components/ChapterWrapper'
import { checkChapterCreationEligibility, createCheckOutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/utils/stripe'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  await createCustomerIfNull()
  if (!session) {
    redirect("/signin")
  }

  const subscribed = await hasSubscription()
  const userData = await prisma.user.findFirst({
    where: {
      email: session.user?.email || ""
    },
    select: {
      savedChapters: true,
      stripe_customer_id: true
    }
  })

  const checkout_link = await createCheckOutLink("" + userData?.stripe_customer_id)
  
  const manage_link = await generateCustomerPortalLink("" + userData?.stripe_customer_id)

  const {isEligible, message} = await checkChapterCreationEligibility() 

  return (
    <div>
      <div className='flex gap-8 justify-end'>
        {
          isEligible && message
        }
        {
          !isEligible && message
        }
        {
          subscribed.isSubscribed && (
            <Link className='border border-black bg-gradient-to-br from-black via-zinc-500 to-black  text-white p-1 rounded' 
            href={"" + manage_link}>
              Manage subscription
            </Link>
          )
        }
        {
          !subscribed.isSubscribed && (
            <Link className='border border-black bg-gradient-to-br from-black via-zinc-500 to-black  text-white p-1 rounded'
            href={"" + checkout_link}>
              upgrad to PREMIUM
            </Link>
          )
        }
        <Header text={`${session.user?.name || "User"} `} />
      </div>
      <ChapterWrapper userData={{ savedChapters: userData?.savedChapters || [] }} />
    </div>
  )
}

export default page