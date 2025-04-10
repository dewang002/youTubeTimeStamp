import Link from 'next/link';
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';
import {Session} from 'next-auth'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface NavItemProp {
  mobile?: boolean;
  href: string;
  label: string;
}

interface NavItemsProp {
  session: Session | null;
  mobile?: boolean
}

interface MobileMenu {
  session: Session | null;
}

const NavItem: React.FC<NavItemProp> = ({ href, label, mobile = false }) => {
  return (
    <Link href={href} className={`${mobile
        ? "flex w-full items-center py-2  text-lg font-bold hover:text-primary transition-colors"
        : "text-muted-foreground hover:text-white transition-colors"
      }`}
      prefetch={false}
    >
      {label}
    </Link>
  )
}

const NavItems: React.FC<NavItemsProp> = ({ session, mobile = false }) => {
  const items: NavItemProp[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ]

  if (session) {
    items.push(
      {
        href: "/dashboard",
        label: "Dashboard",
      }, {
      href: "/generateChapters",
      label: "Generate Chapter"
    }
    )
  }
  return (
    <>
      {items.map(elem => (
        <React.Fragment key={elem.label}>
        <NavItem label={elem.label} href={elem.href} mobile={mobile} />
        </React.Fragment>
      ))}
    </>
  )
}

const MobileNav: React.FC<MobileMenu> = ({ session }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={'ghost'} size={'icon'} className='md:hidden bg-white'>
          <MenuIcon className='h-6 w-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] bg-black text-white sm:w-[400px]'>
        <nav className='flex flex-col gap-4 mt-20 ml-4'>
          <NavItems session={session} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

const Nav = async() => {
  const session:Session | null = await getServerSession(authOptions)
  return (
    <div className='sticky bg-black top-0 z-50 w-full border-b '>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between h-16'>
          <MobileNav session={session} />

          <Link
            href="/"
            prefetch={false}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl">📜</span>
            <span className="hidden text-white font-bold sm:inline-block">
              YouTubeToChapters
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavItems session={session} />
          </nav>

          <div className='flex item-center space-x-4'>
            {session ? (<form action={"/api/auth/signout"} method="POST">
              <Button variant={"outline"} size={"sm"}>
                Sign Out
              </Button>
            </form>
            ) : (
              <Link href="/signin">
                <Button className='bg-white' variant={"ghost"} size={"sm"}>
                  Sign in
                </Button>
              </Link>
            )}
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Nav