"use client"
import Image from 'next/image'
import StickyNavBar from '@/components/platformnavbar'


import 'tailwindcss/tailwind.css'
import Links from '@/components/links'

export default function Dashboard():JSX.Element {
  return (
    <>
      <StickyNavBar/>
      <Links />
    </>
  )
}
