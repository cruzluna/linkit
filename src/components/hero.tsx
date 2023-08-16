import "tailwindcss/tailwind.css";
import Image from "next/image";
import product from "../assets/product.svg";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function Hero(): JSX.Element {
  const router: AppRouterInstance = useRouter();
  return (
    <section className="text-[#FAFAFA]">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:grid lg:grid-cols-2 lg:items-center ">
        <div className="mx-auto max-w-3xl text-center lg:text-left lg:mx-0 lg:pr-10">
          <h1 className=" text-3xl font-extrabold  sm:text-5xl">
            Show{" "}
            <span className="bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent">
              Yourself
            </span>{" "}
            Off.{" "}
            <span className="sm:block">
              Receive{" "}
              <span className="bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent">
                Jobs
              </span>{" "}
              with the Power of{" "}
              <span className="bg-gradient-to-r from-teal-300 via-blue-500 to-noto-purple bg-clip-text text-transparent">
                AI
              </span>
              .
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-lg/relaxed">
            Make a link portfolio to show yourself off and fully manage your
            content while recieving AI-recommended jobs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              type="button"
              className="bg-noto-purple block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </button>
            <a href="#features">
              <button
                type="button"
                className="border border-noto-purple block hover:bg-noto-purple text-white font-bold px-9 py-3 rounded"
                onClick={() => null}
              >
                Learn More
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
          <Image
            src={product}
            alt="sample linkit"
            className="w-4/5 sm:w-3.5/5 sm:mt-10"
          />
        </div>
      </div>
    </section>
  );
}
