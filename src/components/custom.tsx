import 'tailwindcss/tailwind.css'
import customizable from "../assets/customizable.svg"
import Image from 'next/image';

export default function Custom(): JSX.Element {

  return (
    <>
      <div className='py-32 bg-[#1C202F]' id='features'>  
 {/**bg-gray-50 */}
        <div className="container m-auto px-6 text-[#FAFAFA] md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:7/12 lg:w-6/12">
                  <div className='text-sm font-bold ml-0.5 mb-2 tracking-widest text-noto-purple'>IN DEPTH CUSTOMIZATION</div>
                  <h2 className="lg:text-5xl text-3xl font-bold text-[#FAFAFA]">Fully <span className='bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent'>Customize</span> Your Link</h2>
                 
                  <p className="mt-4 ">Personalize your portfolio link to showcase your unique brand and professional identity with custom headers, backgrounds, and fonts.</p>
                
                </div>
                <div className="md:4/12 lg:w-4/12 sm:w-10/12 ml-0 lg:ml-auto">
                  <Image src={customizable} alt="image" loading="lazy" />
                </div>
            </div>
        </div>

      </div>
    </>
  );
}