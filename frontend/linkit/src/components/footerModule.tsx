"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface FooterProps {
  user: string;
}

const Footer = ({ user }: FooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const userlink = "https://www.notespace.ai/" + user;
  const modalRef = useRef(null);

  const copyUrlOnClick = () => {
    navigator.clipboard.writeText(userlink);
    setCopiedUrl(true);
    setTimeout(() => {
      setCopiedUrl(false);
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // event listener for clicking outside of modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !(modalRef.current as HTMLDivElement).contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <footer
        onClick={() => setIsModalOpen(true)}
        className="text-gray-600 text-center mb-10 cursor-pointer"
      >
        Notespace.ai
      </footer>

      {isModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={modalRef}
              className="relative my-6 mx-auto max-w-3xl sm:mx-4"
            >
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col m-6 bg-[#1C202F] outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 ">
                  <div className="bg-[#1C202F]">
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                      {/* close button*/}
                      <button
                        type="button"
                        className="hover:bg-[#1C202F] border  hover:border-[#FF6584] hover-text-white font-bold p-2 rounded flex items-center justify-right"
                        onClick={closeModal}
                      >
                        {/* Close icon */}
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-300">
                        Share Your Notespace
                      </h2>
                      {/* copy to clipboard button*/}
                      <div className="flex justify-center">
                        <button
                          type="button"
                          className="bg-noto-purple flex items-center hover:bg-[#1C202F] border border-noto-purple text-gray-300 font-bold px-3 py-3 rounded"
                          onClick={() => {
                            copyUrlOnClick();
                          }}
                        >
                          {copiedUrl ? (
                            <>
                              Copied to Clipboard
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width="24"
                                height="24"
                                className="ml-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              Copy to Clipboard
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                width="24"
                                height="24"
                                className="ml-2"
                              >
                                <path d="M403.49 64H160a32 32 0 0 0-32 32v319.5a32 32 0 0 0 32 32h243.5a32 32 0 0 0 32-32V96a32 32 0 0 0-32-32zm-7.1 104H176a16 16 0 0 1 0-32h220.4a16 16 0 0 1 0 32zM336 336H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32z"></path>
                              </svg>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex justify-center mt-4">
                        <Link
                          href="/"
                          className="text-gray-500 text-center hover:text-white underline"
                        >
                          {"Don't have an account? Create one now!"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Footer;
