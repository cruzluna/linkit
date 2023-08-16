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
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // component hierarchy
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  // Use useEffect to handle the redirection after rendering
  useEffect(() => {
    if (userLoaded && isSignedIn) {
      router.push("/profile");
    }
  }, [userLoaded, isSignedIn]);

  if (!userLoaded) {
    // TODO: Need to investigate this flow more
    return <div />;
  }

  return (
    <>
      <SignedOut>
        <StickyNavBar />
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
      </SignedOut>
    </>
  );
}
