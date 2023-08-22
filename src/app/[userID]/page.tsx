import { Metadata } from "next";
import Image from "next/image";
import SkillChip from "../../components/skillchip";
import Link from "next/link";
import { getUser } from "../actions/profileForm";

interface PageProps {
  params: {
    userID: string;
  };
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.userID}'s notespace`,
  };
}
const page = async ({ params }: PageProps) => {
  const user = await getUser(params.userID);
  // BELOW is a sample payload
  // const user = {
  //   headline: "Fake Headline Test",
  //   name: "cruz",
  //   links: [
  //     { iconName: "notespace.ai", url: "https://notespace.ai" },
  //     { iconName: "openai.com", url: "https://openai.com" },
  //     { iconName: "github.com", url: "https://github.com/cruzluna" },
  //   ],
  //   tags: [
  //     { id: "cllmxxqam0004put7ws7fw92j", skill: "tag1" },
  //     { id: "cllmxxqam0005put7ajp80dtx", skill: "tag2" },
  //     { id: "cllmxxqam0006put7k6fqb73v", skill: "tag3" },
  //   ],
  //   tools: [
  //     { iconName: "Python", toolItem: "Python" },
  //     { iconName: "Golang", toolItem: "Golang" },
  //     { iconName: "C++", toolItem: "C++" },
  //     { iconName: "AWS", toolItem: "AWS" },
  //     { iconName: "Google Cloud", toolItem: "Google Cloud" },
  //   ],
  // };
  // //TODO: if no user....
  console.log("PAGE", user);
  console.log(user?.tags);

  // this page receives the slug
  // fetch user data from db and create the link tree
  return (
    <>
      <div className="min-h-screen text-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <figure className="p-6">
            <div className="rounded-full w-32 h-32 mx-auto bg-noto-purple bg-opacity-50 " />
            <div className="pt-6 text-center space-y-4">
              <figcaption className="font-medium">
                <div className="text-[#FAFAFA] text-2xl font-bold ">Name</div>
                <div className="mt-2 font-bold text-[#FAFAFA] ">Headline</div>
              </figcaption>

              <div>
                {user?.tags.map((tag) => {
                  return (
                    <SkillChip key={tag.id} loading={false}>
                      {tag.skill}
                    </SkillChip>
                  );
                })}
              </div>
            </div>
          </figure>
        </div>

        <div className="flex flex-col-1">
          <div className="max-w-xs mx-auto py-2">
            <div className="flex flex-col-1 items-start space-y-4  ">
              <div className="flex items-start w-80 text-center rounded-lg border border-gray-400 bg-[#FAFAFA] px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150">
                <p className="px-3 h-6 w-6"> 🔗 </p>
                <p className="text-[#1B1B1B] mx-auto truncate">Loading...</p>
                <div className="px-auto mt-0.5">
                  <svg
                    className="h-5 w-4 text-[#1B1B1B]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-1">
          <div className="max-w-xs mx-auto py-2">
            <div className="flex flex-col-1 items-start space-y-4  ">
              <div className="flex items-start w-80 text-center rounded-lg border border-gray-400 bg-[#FAFAFA] px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150">
                <p className="px-3 h-6 w-6"> 🔗 </p>
                <p className="text-[#1B1B1B] mx-auto truncate">Loading...</p>
                <div className="px-auto mt-0.5">
                  <svg
                    className="h-5 w-4 text-[#1B1B1B]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-1">
          <div className="max-w-xs mx-auto py-2">
            <div className="flex flex-col-1 items-start space-y-4  ">
              <div className="flex items-start w-80 text-center rounded-lg border border-gray-400 bg-[#FAFAFA] px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150">
                <p className="px-3 h-6 w-6"> 🔗 </p>
                <p className="text-[#1B1B1B] mx-auto truncate">Loading...</p>
                <div className="px-auto mt-0.5">
                  <svg
                    className="h-5 w-4 text-[#1B1B1B]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
