import Stripe from 'stripe'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2025-03-31.basil'
})

interface StripeSubscription {
    status: string;
    current_period_start: number;
    current_period_end: number;
    created: number;
}

export async function hasSubscription(): Promise<{
    isSubscribed: boolean;
    subscriptionData: StripeSubscription[];
}> {
    const session = await getServerSession(authOptions)
    if (session && session.user?.email) {
        const user = await prisma.user.findFirst({
            where: {
                email: session?.user?.email
            }
        })

        if (!user?.stripe_customer_id) {
            return {
                isSubscribed: false,
                subscriptionData: [],
            };
        }

        const subscriptions = await stripe.subscriptions.list({
            customer: String(user?.stripe_customer_id)
        })

        return {
            isSubscribed: subscriptions.data.length > 0,
            subscriptionData: subscriptions.data,
        };
    }
    return {
        isSubscribed: false,
        subscriptionData: []
    }
}

export const createCheckOutLink = async (customer: string) => {
    const checkout = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/dashboard&success=true`,
        cancel_url: `http://localhost:3000/dashboard&success=false`,
        customer: customer,
        line_items: [
            {
                price: process.env.PRICE_KEY,
                quantity: 1
            }
        ],
        mode: "subscription"
    })
    return checkout.url;
}

export const generateCustomerPortalLink = async (customerId: string) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,   
            return_url: "http://localhost:3000/dashboard"
        })
        return portalSession.url
    } catch (e) {
        console.log(e)
    }
}

export const createCustomerIfNull = async () => {
    const session = await getServerSession(authOptions)
    if (session && session.user?.email) {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        })

        if (!user?.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: session.user.email,
            })

            await prisma.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    stripe_customer_id: customer.id
                }
            })

            const user2 = await prisma.user.findFirst({
                where: {
                    id: user?.id
                }
            })

            return user2?.stripe_customer_id;
        }
    }
}