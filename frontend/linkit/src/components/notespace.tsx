import React from 'react'
import { UserFooterComponent } from './userProfileFooter';
import { IconComponent, getIconName } from '@/assets/iconMap';
import Link from 'next/link';
import ShareModule from './shareModule';
import Image from 'next/image';
import SkillChip from "./skillchip";
import { User } from '@/interfaces/User';



interface NotespaceProps {
user: User,
profileImage: any,
params:any
}


const Notespace = ({user, profileImage, params}: NotespaceProps) => {
  return (
    <>
      <div className="flex flex-col justify-between text-[#FAFAFA]">
        <div>
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <figure className="p-6 ml-8">
              <Image
                className="rounded-full w-32 h-32 mx-auto bg-noto-purple bg-opacity-50 "
                src={profileImage}
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
            <div className="flex items-start hover:text-white text-gray-400 h-[220px] justify-start">
              <ShareModule user={params.userID} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {user.links.map((link) => {
              if (link.enabled) {
                return (
                  <div key={link.id} className="max-w-xs py-2">
                    <button className="flex flex-col items-start space-y-4">
                      <Link
                        href={
                          link.url.startsWith("http://") ||
                          link.url.startsWith("https://")
                            ? link.url
                            : `https://${link.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-80 text-center rounded-lg border border-gray-400 bg-[#FAFAFA] px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150 hover:bg-noto-purple"
                      >
                        <IconComponent
                          className="px-1 h-8 w-8 fill-deep-purple-900"
                          iconKey={getIconName(link.url)}
                        ></IconComponent>
                        <p className="text-[#1B1B1B] truncate">{link.title}</p>
                        <div>
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
                );
              }
            })}
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-2 font-bold text-[#FAFAFA] text-2xl">Tools</div>
            <div className="flex flex-wrap justify-center mt-2">
              {user.tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center m-1"
                >
                  <div className="rounded-full bg-[#1C202F] p-2 hover:animate-spin">
                    <IconComponent
                      iconKey={tool.iconName}
                      size="40"
                      className="text-xl text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <UserFooterComponent />
      </div>
    </>
  )
}

export default Notespace