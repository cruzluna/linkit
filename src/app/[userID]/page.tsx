// @ts-nocheck
import { Metadata } from "next";
import Image from "next/image";
import SkillChip from "../../components/skillchip";
import Link from "next/link";
import { getUser } from "../actions/profileForm";
import { clerkClient } from "@clerk/nextjs";
import { IconComponent } from "../../assets/iconMap";

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
  // TODO: if !user --> should go to error page already....
  const user = await getUser(params.userID);
  if (!user) return null;

  // TODO: if null, use a default? most likely server problem
  // @ts-ignore
  const clerkUser = await clerkClient.users.getUser(user.clerkId);

  // PAYLOAD of image url:
  // const imageUrl =
  //   "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yUmN5RUliVzVycXdxWFVwRXBPU3FLeWc5MVQuanBlZyJ9";

  // console.log("CLERK USER\n", clerkUser.imageUrl);
  // console.log(user);
  // BELOW is a sample payload
  // const user = {
  //   clerkId: "user_2RcyEBMi6aQbCP95hVGJmsIJa6F",
  //   headline: "test headline",
  //   name: "Test Name",
  //   links: [
  //     {
  //       title: "github.com/cruzluna",
  //       iconName: "github.com/cruzluna",
  //       url: "github.com/cruzluna",
  //     },
  //     {
  //       title: "notespace.ai",
  //       iconName: "notespace.ai",
  //       url: "notespace.ai",
  //     },
  //     {
  //       title: "https://linkedin.com/cruzluna",
  //       iconName: "linkedin.com",
  //       url: "https://linkedin.com/cruzluna",
  //     },
  //   ],
  //   tags: [
  //     { id: "clln2oqsz000apu7bm03affrn", skill: "tag1" },
  //     { id: "clln2oqsz000bpu7bzldchl2a", skill: "tag2" },
  //     { id: "clln2oqsz000cpu7bpcvia38u", skill: "tag3" },
  //   ],
  //   tools: [
  //     { iconName: "C++", toolItem: "C++" },
  //     { iconName: "Golang", toolItem: "Golang" },
  //     { iconName: "VsCode", toolItem: "VsCode" },
  //     { iconName: "Python", toolItem: "Python" },
  //     { iconName: "AWS", toolItem: "aws" },
  //   ],
  // };

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
  //
  // // //TODO: if no user....
  // console.log("PAGE", user);
  // console.log(user?.tags);
  //
  // this page receives the slug
  // fetch user data from db and create the link tree
  return (
    <>
      <div className="min-h-screen text-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <figure className="p-6">
            <Image
              className="rounded-full w-32 h-32 mx-auto bg-noto-purple bg-opacity-50 "
              src={clerkUser.imageUrl}
              width={500}
              height={500}
              alt={"profile-image"}
            />
            <div className="pt-6 text-center space-y-4">
              <figcaption className="font-medium">
                <div className="text-[#FAFAFA] text-2xl font-bold ">
                  {user.name}
                </div>
                <div className="mt-2 font-bold text-[#FAFAFA] ">
                  {user.headline}
                </div>
              </figcaption>
              <div>
                {user.tags.map((tag) => {
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

        {user.links.map((link) => {
          return (
            <div key={link.id} className="flex flex-col-1">
              <div className="max-w-xs mx-auto py-2">
                <button className="flex flex-col-1 items-start space-y-4 ">
                  <Link
                    href={`https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start w-80 text-center rounded-lg border border-gray-400 bg-[#FAFAFA] px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150 hover:bg-noto-purple"
                  >
                    <IconComponent
                      className="px-1 mr-3 h-8 w-8 fill-deep-purple-900"
                      iconKey={link.iconName.split(".")[0]}
                    ></IconComponent>
                    <p className="text-[#1B1B1B] mx-auto truncate">
                      {link.iconName.split(".")[0]}
                    </p>
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
                  </Link>
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col items-center">
          <div className="mt-2 font-bold text-[#FAFAFA] text-2xl">Tools</div>
          <div className="flex flex-wrap justify-center mt-2">
            {user.tools.map((tool, index) => (
              <div key={index} className="flex items-center justify-center m-1">
                <div className="rounded-full bg-[#1C202F] p-2">
                  <IconComponent
                    iconKey={tool.iconName}
                    size="40"
                    className="text-xl text-white hover:animate-spin"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
