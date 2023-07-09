"use client"
import Image from 'next/image'
import StickyNavBar from '@/components/navbar';
import Hero from '@/components/hero';
import Custom from '@/components/custom';
import Share from '@/components/share';
import Analyze from '@/components/analysis';
import AI from '@/components/ai';
import Sections from '@/components/sections';
import FAQs from '@/components/faqs';
import Footer from '@/components/footer';
import 'tailwindcss/tailwind.css'

export default function Home() {
  return (
    <>
      <StickyNavBar />
      <Hero />
      <Custom />
      <Share />
      <Analyze />
      <AI />
      <Sections />
      <FAQs />
      <Footer />
    </>
  )
}
