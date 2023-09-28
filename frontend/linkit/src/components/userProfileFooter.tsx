"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

export const UserFooterComponent = () => {
  const router: AppRouterInstance = useRouter();
  return (
    <button onClick={() => router.push("/")}>
      <footer className="text-center text-gray-500 m-10">notespace.ai</footer>
    </button>
  );
};
