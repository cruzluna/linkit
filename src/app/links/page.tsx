"use client";
import StickyNavBar from "@/components/platformnavbar";

import "tailwindcss/tailwind.css";
import Links from "@/components/links";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <StickyNavBar />
      <Links />
    </>
  );
}
