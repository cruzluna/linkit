"use client";
import StickyNavBar from "@/components/navbar";
import Hero from "@/components/hero";
import Custom from "@/components/custom";
import Share from "@/components/share";
import Analyze from "@/components/analysis";
import AI from "@/components/ai";
import Sections from "@/components/sections";
import FAQs from "@/components/faqs";
import Footer from "@/components/footer";
import "tailwindcss/tailwind.css";
import { Suspense } from "react";
import Loading from "./loading";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import PlatformNavbar from "@/components/platformnavbar";

export default function Home() {
  const { isLoaded: userLoaded } = useUser();
  if (!userLoaded) {
    // TODO: Need to investigate this flow more
    return null;
  }
  // component hierarchy
  return (
    <>
      <SignedOut>
        <StickyNavBar />
      </SignedOut>
      <SignedIn>
        <PlatformNavbar />
      </SignedIn>
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
      <Custom />
      <Share />
      <Analyze />
      <AI />
      <Sections />
      <FAQs />
      <Footer />
    </>
  );
}
