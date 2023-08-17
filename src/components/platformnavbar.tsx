import "tailwindcss/tailwind.css";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function PlatformNavbar() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/links"}>Links</Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1  font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/profile"}>Profile</Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1  font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/analytics"}>Analytics</Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/jobs"}>Jobs</Link>
        </div>
      </Typography>
    </ul>
  );

  return (
    <>
      {/** if u want a transparent navbar, add bg-opacity-20 backdrop-filter backdrop-blur-lg to the navbar class */}

      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4  bg-[#12141F] "
        color="transparent"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <button
            type="button"
            className="flex items-center mr-4"
            onClick={() => router.push("/")}
          >
            <Image className="w-10" src={logo} alt="notespace logo" />
          </button>
          <div className="ml-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-noto-purple hidden lg:inline-block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded hidden lg:inline-block"
              onClick={() =>
                (window.location.href = "https://eepurl.com/ilQO8-")
              }
            >
              Share
            </button>
            <UserButton afterSignOutUrl="/" />

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-[#FAFAFA] hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <button
            type="button"
            className="bg-noto-purple border border-noto-purple hover:bg-[#12141F] text-white font-bold px-3 py-3 rounded w-full"
            onClick={() => null}
          >
            Share
          </button>
        </Collapse>
      </Navbar>
    </>
  );
}