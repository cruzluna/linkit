"use client";
import { useUser } from "@clerk/nextjs";
import LinkComponent from "./singleLinkComponent"; // cant be named Link due to Link type below
import { useEffect, useState } from "react";
import { getLinks } from "@/app/actions/linksActions";

import type { Link } from "@prisma/client";
import LinkFormComponent from "./linkFormComponent";
export type LinkWithoutUserId = Omit<Link, "userId">;

export default function Links() {
  const { user, isLoaded } = useUser(); // get clerk user for clerkId
  // TODO: limit no. of links total
  const [linkData, setLinkData] = useState<LinkWithoutUserId[]>([]);
  const handleDeleteLink = (linkIdToDelete: string) => {
    // Filter out the link to be deleted based on its ID
    const updatedLinkData = linkData.filter(
      (link) => link.id !== linkIdToDelete
    );
    setLinkData(updatedLinkData);
  };

  const handleUpdateLink = (
    linkIdToUpdate: string,
    newTitle: string,
    newUrl: string
  ) => {
    // Create a new array with the updated link data
    const updatedLinkArray = linkData.map(
      (link) =>
        link.id === linkIdToUpdate
          ? { ...link, title: newTitle, url: newUrl } // Update title and URL
          : link // Keep the original link data for other links
    );

    // Update the state with the new array
    setLinkData(updatedLinkArray);
  };
  const handleAddLink = (linkToAdd: LinkWithoutUserId) => {
    setLinkData([...linkData, linkToAdd]);
  };

  // TODO: determine to useMemo or useEffect
  useEffect(() => {
    // console.log("USE EFFECT called in Links");
    if (isLoaded && user) {
      const fetchLinks = async () => {
        const check = await getLinks(user.id);
        if (check !== null) {
          // profile created means do not access profile form
          setLinkData(check.links);
        }
      };
      fetchLinks();
    }
  }, [user]);

  // Sample payload
  // const linkData = [
  //   {
  //     id: "asdfadf",
  //     title: "github.com/cruzluna",
  //     iconName: "github.com/cruzluna",
  //     url: "github.com/cruzluna",
  //     enabled: true,
  //   },
  //   {
  //     id: "dadsfadsf",
  //     title: "notespace.ai",
  //     iconName: "notespace.ai",
  //     url: "notespace.ai",
  //     enabled: true,
  //   },
  //   {
  //     id: "asdasdfdadsfadsf",
  //     title: "https://linkedin.com/cruzluna",
  //     iconName: "linkedin.com",
  //     url: "https://linkedin.com/cruzluna",
  //     enabled: true,
  //   },
  // ];

  // TODO: Update this to an array , and limit total enabled links
  const [addOneLink, setAddOneLink] = useState<boolean>(false);

  const handleAddOneLink = () => {
    setAddOneLink(false);
  };
  return (
    <>
      <section>
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="bg-noto-purple border border-noto-purple hover:bg-[#12141F] text-white font-bold px-3 py-3 rounded w-1/3 mx-auto"
            onClick={() => setAddOneLink(true)}
          >
            Add Link
          </button>
        </div>
        <div className="ml-2 mr-2">
          {linkData.map((link) => (
            <LinkComponent
              key={link.id}
              id={link.id}
              title={link.title}
              url={link.url}
              initialEnabled={link.enabled}
              handleDeleteLink={handleDeleteLink}
              handleUpdateLink={handleUpdateLink}
            />
          ))}
          {/* New links to add */}
          {user && addOneLink && (
            <LinkFormComponent
              clerkId={user.id}
              handleAddOneLink={handleAddOneLink}
              handleAddLink={handleAddLink}
            />
          )}
        </div>
      </section>
    </>
  );
}
