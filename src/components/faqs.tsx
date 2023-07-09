
import 'tailwindcss/tailwind.css'
import {
  Button,
} from "@material-tailwind/react";
import Image from 'next/image';
import product from "../assets/product.svg"

export default function FAQs(): JSX.Element {
  return (
    <section className="bg-[#12141F] flex justify-center py-16 text-[#FAFAFA]" id='faqs'>
   
      <div className="max-w-lg">
        <div className="space-y-4 ml-4 mr-4">
          <div className="mx-auto max-w-lg text-center">
            <div className="text-5xl font-bold mb-10"><span className='bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent'>FAQs</span></div>
          
          </div>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-[#1C202F] p-4">
              <h2 className="font-medium">
                Is notespace free or is this a trial?
              </h2>
              <svg
                className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxed">
              No, notespace is free!
            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-[#1C202F] p-4">
              <h2 className="font-medium">
                How can I check the jobs I get recommended?
              </h2>
              <svg
                className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 px-4 leading-relaxedbg-[#1C202F]">
              Our platform will have them for you!
            </p>
          </details>
          <div className="flex flex-1 flex-col items-center lg:items-center ">
            <h2 className="text-3xl md:text-4 lg:text-5xl text-center mt-10 mb-10 font-extrabold md:font-bold">
              Ready to <span className='bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent'>Start?</span>
            </h2>
            <div className="flex justify-center flex-wrap py-px">
              <button
                type="button"
                className="bg-noto-purple block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded"
                onClick={() =>
                  (window.location.href = "https://eepurl.com/ilQO8-")
                }
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
