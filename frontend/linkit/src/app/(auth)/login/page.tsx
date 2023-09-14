"use client";
import { SignIn } from "@clerk/clerk-react";
export default function Login() {
  return (
    <div className="flex items-center justify-center">
      <SignIn path={"/login"} redirectUrl={"/user/links"} />
    </div>
  );
}
