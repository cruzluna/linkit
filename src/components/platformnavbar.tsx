import 'tailwindcss/tailwind.css'
import logo from "../assets/logo.svg"
import React from "react";
import Link from 'next/link';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
  Card,
} from "@material-tailwind/react";
import Image from 'next/image';
 
export default function StickyNavBar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/links"}>
            Links
          </Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/profile"}>
            Profile
          </Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/analytics"}>
            Analytics
          </Link>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal font-semibold"
      >
        <div className="flex items-center text-[#FAFAFA] hover:text-noto-purple">
          <Link href={"/jobs"}>
            Jobs
          </Link>
        </div>
      </Typography>
      
    </ul>
  );
 
  return (
    <>
    {/** if u want a transparent navbar, add bg-opacity-20 backdrop-filter backdrop-blur-lg to the navbar class */}
      
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4  bg-[#12141F] " color='transparent'>
        <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex items-center mr-4">
              <Image 
                className="w-10"
                src={logo} 
                alt="Store Logo"
              />
              <div className='ml-4 hidden lg:block'>
              {navList}
              </div>
            </div>
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
            onClick={() =>
              null
            }
          >
            Share
          </button>
        </Collapse>
       
      </Navbar>
    </>
  );
}