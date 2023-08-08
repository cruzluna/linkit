
import 'tailwindcss/tailwind.css'
import Link from './link'

export default function Links(): JSX.Element {
  return (
    <>
      <section>
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="bg-noto-purple border border-noto-purple hover:bg-[#12141F] text-white font-bold px-3 py-3 rounded w-1/3 mx-auto"
            onClick={() =>
              null
            }
          >
            Add Link
          </button>
        </div>

        <Link 
          title='LinkedIn Link' 
          url='https://www.linkedin.com' 
          clicks={234} 
          enabled={true}
        />

        <Link 
          title='Facebook Link' 
          url='https://www.facebook.com' 
          clicks={432} 
          enabled={true}
        />

      </section>
      
    </>
  )
}
