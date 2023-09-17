import { SignUp } from "@clerk/nextjs";
export default function CreateAccount() {
  return (
    <div className='md:h-screen py-20 lg:py-0 bg-black w-full flex justify-center items-center'>
      <SignUp
        path={"/signup"}
        signInUrl={"/login"}
        appearance={{
          elements: {
            logoBox: 'hidden',
            card: " bg-[rgba(255,255,255,0.2)] w-full md:w-[30%] border border-[rgba(255,255,255,0.1)]",
            formButtonPrimary: 'hover:-translate-y-1 transition-all duration-500 overflow-hidden hover:bg-transparent bg-transparent h-12 flex items-center justify-center before:-translate-x-[40rem] before:-z-10 hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative before:bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple text-white py-2 px-4 rounded-md before:transition-all before:duration-500',
            headerTitle: 'text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple',
            headerSubtitle: 'text-white',
            // socialButtonsBlockButton: 'border border-[rgba(255,255,255,0.3)] text-white rounded-md py-4',
            dividerLine: 'bg-white',
            dividerText: 'text-white',
            formFieldInput: 'p-3 rounded-lg mt-2 w-full text-white outline-none bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)]',
            formFieldLabel: 'text-white',
            footerActionText: 'text-white -mt-3',
            footerActionLink: 'hover:bg-gradient-to-r hover:from-teal-300 hover:via-blue-500 hover:to-noto-purple  hover:text-transparent hover:bg-clip-text text-teal-300 -mt-3',
          }
        }} />
    </div>
  );
}
