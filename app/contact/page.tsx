import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
import { Linkedin, Mail, Trash, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const ContactItem = ({ icone, title, contect, href }: {
    icone: React.ElementType,
    title: string,
    contect: string,
    href: string
}) => {
    return (
        <div>
            <div>
                <Link href={href}>
                    {React.createElement(icone, {
                        className: 'w-5 h-5'
                    })}
                </Link>
                <h3 className='font-semibold text-lg mb-2 mt-2'>{title}</h3>
                <p className='font-light text-muted-foreground'>{contect}</p>
            </div>
        </div>
    )
}

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <p className='font-light mb-10 text-xl'>
                    Have questions? We are here to help!
                </p>
                <div className='grid gap-6 md:grid-cols-2'>
                    <ContactItem icone={Mail} title='General Inquiries' href='mailto:dewangthapa6@gmail.com' contect='For any questions or support, please email use.' />
                    <ContactItem icone={Twitter} title='Follow on X' href='https://x.com/ThapaDewang' contect='stay updated with our latest news' />
                    <ContactItem icone={Linkedin} title='General Inquiries' href='https://www.linkedin.com/in/dewang-thapa-714491239/' contect='connect with me on LinkedIn' />
                    <ContactItem icone={Trash} title='Delete account' href='mailto:dewangthapa6@gmail.com' contect='Email me to delete you account' />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default page