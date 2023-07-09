import 'tailwindcss/tailwind.css'
import showoff from "../assets/showoff.svg"
import Image from 'next/image';

export default function Share(): JSX.Element {

  return (
    <>
      <div className='py-32' id='about'>  
 {/**bg-gray-50 */}
        <div className="container m-auto px-6 text-[#FAFAFA] md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12 ml-0 lg:ml-auto">
                <Image src={showoff} alt="image" loading="lazy" />
              </div>
              <div className="md:7/12 lg:w-6/12">
              <div className='text-sm font-bold ml-0.5 mb-2 tracking-widest text-noto-purple'>LINK IN BIO PORTFOLIOS</div>
                <h2 className="lg:text-5xl text-3xl font-bold text-[#FAFAFA]">Share Your Link <span className='bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent'>Anywhere</span></h2>
                
                <p className="mt-4 ">Easily distribute your portfolio link across platforms, making it accessible to potential employers, clients, and collaborators anywhere.</p>
              
              </div>
               
            </div>
        </div>

      </div>
    </>
  );
}