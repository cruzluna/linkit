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
  // need cruz's help with this part
  // want to query db to get the username, which we will append to notespace.ai/ to get the full link
  const notespaceUrl: string = "https://notespace.ai";
  const userName: string = "";

  const profileUrl: string = `${notespaceUrl}/${userName}`;

  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const copyUrlOnClick = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopiedUrl(true);
    setTimeout(() => {
      setCopiedUrl(false);
    }, 3000);
  };

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
              onClick={() => setShowModal(true)}
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
            onClick={() => setShowModal(true)}
          >
            Share
          </button>
        </Collapse>
      </Navbar>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#1C202F] outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <section className="bg-[#1C202F] ">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-[#FAFAFA]">
                        Share Your notespace
                      </h2>
                      <p className="mb-4 lg:mb-8 font-light text-center text-gray-200 sm:text-xl">
                        Copy and paste your link anywhere
                      </p>
                      <div className="flex justify-center mb-8">
                        {/* Added container */}
                        <a
                          href={profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-5 bg-[#12141F] text-base font-medium text-gray-500 rounded-lg hover:text-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {/** <svg aria-hidden="true" className="w-5 h-5 mr-3" viewBox="0 0 22 31" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4151_63004)"><path d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z" fill="#0ACF83"/><path d="M0.00195312 15.062C0.00195312 12.2905 2.46546 10.0413 5.50085 10.0413H10.9998V20.0827H5.50085C2.46546 20.0827 0.00195312 17.8334 0.00195312 15.062Z" fill="#A259FF"/><path d="M0.00195312 5.02048C0.00195312 2.24904 2.46546 -0.000244141 5.50085 -0.000244141H10.9998V10.0412H5.50085C2.46546 10.0412 0.00195312 7.79193 0.00195312 5.02048Z" fill="#F24E1E"/><path d="M11 -0.000244141H16.4989C19.5343 -0.000244141 21.9978 2.24904 21.9978 5.02048C21.9978 7.79193 19.5343 10.0412 16.4989 10.0412H11V-0.000244141Z" fill="#FF7262"/><path d="M21.9978 15.062C21.9978 17.8334 19.5343 20.0827 16.4989 20.0827C13.4635 20.0827 11 17.8334 11 15.062C11 12.2905 13.4635 10.0413 16.4989 10.0413C19.5343 10.0413 21.9978 12.2905 21.9978 15.062Z" fill="#1ABCFE"/></g><defs><clipPath id="clip0_4151_63004"><rect width="22" height="30.1244" fill="white" transform="translate(0 -0.000244141)"/></clipPath></defs></svg>                                              */}
                          <span className="w-full">{profileUrl}</span>
                          <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="bg-[#FF6584] hover:bg-[#1C202F] border border-[#FF6584] hover- text-white font-bold px-3 py-3 rounded"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="bg-noto-purple hover:bg-[#1C202F] border border-noto-purple text-white font-bold px-3 py-3 rounded"
                          onClick={() => {
                            copyUrlOnClick();
                          }}
                        >
                          {copiedUrl ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
