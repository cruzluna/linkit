import "tailwindcss/tailwind.css";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function StickyNavBar() {
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
        <Link
          href="#features"
          className="flex items-center text-[#FAFAFA] hover:text-noto-purple"
        >
          Features
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1  font-semibold"
      >
        <Link
          href="#faqs"
          className="flex items-center text-[#FAFAFA] hover:text-noto-purple"
        >
          FAQs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 font-semibold"
      >
        <Link
          href="#faqs"
          className="flex items-center text-[#FAFAFA] hover:text-noto-purple"
        >
          Ambassador Program
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
      {/** if u want a transparent navbar, add bg-opacity-20 backdrop-filter backdrop-blur-lg to the navbar class */}

      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4  bg-[#12141F] bg-opacity-20 backdrop-filter backdrop-blur-lg "
        color="transparent"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Button variant="text" onClick={() => router.refresh()}>
            <div className="flex items-center">
              <Image className="w-10" src={logo} alt="notespace logo" />
              <div className="px-3 py-4 font-semibold text-2xl text-[#FAFAFA] lowercase">
                notespace
              </div>
            </div>
          </Button>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex space-x-4">
            <button
                type="button"
                className="lg:inline-block hover:text-noto-purple text-white font-bold px-9 py-3 hidden lg:inline-block"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="bg-noto-purple hidden lg:inline-block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded-full hidden lg:inline-block"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
              <IconButton
                variant="text"
                className="ml-4 h-6 w-6 text-[#FAFAFA] hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
        </div>

        <Collapse open={openNav}>
          {navList}
          <button
            type="button"
            className="border hover:bg-noto-purple text-white font-bold px-3 py-3 rounded w-full mb-2"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-noto-purple border border-noto-purple hover:bg-[#12141F] text-white font-bold px-3 py-3 rounded w-full mb-2"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </Collapse>
      </Navbar>
    </>
  );
}
