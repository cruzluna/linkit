"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function CallBackPage() {
  return <AuthenticateWithRedirectCallback redirectUrl={"/user/profile"} />;
}
