"use client";
import PlatformNavbar from "@/components/platformnavbar";

import "tailwindcss/tailwind.css";
import Links from "@/components/links";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <PlatformNavbar />
      <Links />
    </>
  );
}
