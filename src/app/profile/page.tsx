"use client";
import React from "react";
import logo from "../../assets/logo.svg";
import Image from "next/image";
import PlatformNavbar from "@/components/platformnavbar";

export default function page() {
  return (
    <>
      <PlatformNavbar />
      <div className="max-w-7xl mx-auto">
        <div>
          <figure className="p-6">
            <Image
              className="w-32 h-32 rounded-full mx-auto"
              src={logo}
              alt="profile picture"
            />
            <div className="pt-6 text-center space-y-4">
              <div className="flex flex-col items-center">
                {" "}
                {/* Center horizontally */}
                <label
                  htmlFor="UserEmail"
                  className="block mt-5 overflow-hidden w-1/5 rounded-md bg-[#1C202F] px-3 py-2 shadow-sm focus-within:border-noto-purple focus-within:ring-1 focus-within:ring-noto-purple text-[#FAFAFA]"
                >
                  <span className="text-xl font-bold"> Email </span>

                  <input
                    type="Name"
                    id="UserEmail"
                    placeholder="Jane Doe"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm rounded text-[#1B1B1B]"
                  />
                </label>
                <label
                  htmlFor="UserEmail"
                  className="block mt-5 overflow-hidden w-1/5 rounded-md bg-[#1C202F] px-3 py-2 shadow-sm focus-within:border-noto-purple focus-within:ring-1 focus-within:ring-noto-purple text-[#FAFAFA]"
                >
                  <span className="text-xl font-bold"> Tags </span>

                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Backend, ML/AI"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm rounded text-[#1B1B1B]"
                  />
                </label>
                <label
                  htmlFor="UserEmail"
                  className="block mt-5 overflow-hidden w-1/5 rounded-md bg-[#1C202F] px-3 py-2 shadow-sm focus-within:border-noto-purple focus-within:ring-1 focus-within:ring-noto-purple text-[#FAFAFA]"
                >
                  <span className="text-xl font-bold"> Bio </span>

                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Biography"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm rounded text-[#1B1B1B]"
                  />
                </label>
              </div>
            </div>
          </figure>
        </div>
        <div className="flex justify-center">
          {" "}
          {/* Center the save button */}
          <button
            type="button"
            className="bg-noto-purple lg:inline-block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded"
            onClick={() => null}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
