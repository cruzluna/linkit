import 'tailwindcss/tailwind.css'

export default function Services(): JSX.Element {

  return (
    <>
      <section className="bg-[#1C202F] text-[#FAFAFA]">
        <div
          className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        >
          <div className="mx-auto max-w-lg text-center">
            <div className="text-5xl font-bold ">Achieve <span className='bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent'>New Heights</span></div>

            <p className="mt-4">
            From customizable portfolios to AI-powered job recommendations, we empower you to reach greater success in your career.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="block bg-[#12141F] rounded-xl border border-[#12141F] p-8 "
         
            >
              {/**
               * 
               * 
               */}
             
             

              <h2 className=" text-xl font-bold">Show Off Your Entire Portfolio</h2>

              <div className="mt-3 border-t-4 border-noto-purple text-sm ">
                
              </div>

              <p className="mt-2 text-sm ">
                Include everything without having the fear of leaving something out, in style
              </p>
            </div>

            <div
              className="block bg-[#12141F] rounded-xl border border-[#12141F] p-8 "
         
            >
              {/**
               * 
               * 
               */}
             
             

              <h2 className=" text-xl font-bold">Embed Your Link Across Your Social Medias</h2>

              <div className="mt-3 border-t-4 border-noto-purple text-sm ">
                
              </div>

              <p className="mt-2 text-sm ">
                Use your notespace link on LinkedIn, Instagram, Twitter, and anywhere else.
              </p>
            </div>

            <div
              className="block bg-[#12141F] rounded-xl border border-[#12141F] p-8 "
         
            >
              {/**
               * 
               * 
               */}
             
             

              <h2 className=" text-xl font-bold">Apply to Selected Jobs Tailored to You</h2>

              <div className="mt-3 border-t-4 border-noto-purple text-sm ">
                
              </div>

              <p className="mt-2 text-sm ">
                The jobs we recommend are refined to your skills, saving you time.
              </p>
            </div>

          </div>     
        </div>
      </section>
    </>
  );
}