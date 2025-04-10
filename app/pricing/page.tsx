import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckIcon, XIcon } from 'lucide-react';
import React from 'react'

const page = () => {

  const pricingOptions = [
    {
      title: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["5 chapter generations per month", "Basic support"],
      limitations: ["No access to premium features"],
      buttonText: "Get started",
      popular: false,
    },
    {
      title: "Pro plan",
      price: "$5",
      description: "For regular uploaders",
      features: ["40 chapter generations per month", "Priority support"],
      limitations: [],
      buttonText: "Upgrade now",
      popular: true,
    },
  ];

  return (
    <MaxWidthWrapper className='flex flex-col gap-10'>
      <div className='text-center'>
        <h1 className='text-4xl font-light'>Simple, and Transparent pricing</h1>
        <p className='text-muted-foreground font-light'>Choose the plan that work best for you</p>
      </div>
      <div className='text-center'>
        <span className='border-2 border-amber-700 text-white p-2 rounded-xl text-lg font-bold bg-amber-500'>
          Billed Monthly
        </span>
      </div>
      <div className='sm:flex sm:flex-row flex flex-col items-center gap-8 justify-center'>
        {
          pricingOptions.map((elem, index) => (
            <Card key={index} className={`relative w-sm overflow-hidden ${elem.popular ? "border-primary shadow-lg hover:shadow-xl"
              : "hover:border-primary/50 hover:shadow-md"}`}>

              {elem.popular &&
                <div className='absolute top-0 right-0'>
                  <Badge className='m-2 py-1.5 uppercase border-4 border-amber-600  bg-amber-500 text-white '>
                    Most popular
                  </Badge>
                </div>}

              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-3xl font-bold mb-2">
                  {elem.title}
                </CardTitle>
                <span className="text-5xl font-extrabold">{elem.price}</span>
                {elem.price !== "Free" && (
                  <span className="text-xl text-muted-foreground">/month</span>
                )}
              </CardHeader>
              <CardDescription className='text-center'>
                {elem.description}
              </CardDescription>
              <CardContent className='flex flex-col items-center'>
                <ul className="space-y-4 mb-8">
                  {elem.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="w-4 h-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                  {elem.limitations?.map((limitation, index) => (
                    <li key={index} className="flex items-center">
                      <XIcon className="w-4 h-4 mr-2 text-red-500" />
                      {limitation}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <Button className={`${elem.popular ? 'bg-amber-500 hover:bg-amber-500 ' : 'bg-black'} active:scale-95`}>
                {elem.buttonText}
              </Button>
            </Card>
          ))
        }
      </div>
    </MaxWidthWrapper>
  )
}

export default page