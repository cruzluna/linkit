"use client";
import { useUser } from "@clerk/nextjs";
import LinkComponent from "./singleLinkComponent"; // cant be named Link due to Link type below
import { useEffect, useState } from "react";
import { getLinks } from "@/app/actions/linksActions";

import type { Link } from "@prisma/client";
import LinkFormComponent from "./linkFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setLinkData } from "@/redux/features/fetchLinkSlice";
import { toggleBoolean } from '@/redux/features/booleanSlice';

export type LinkWithoutUserId = Omit<Link, "userId">;

export default function Links() {
  const { user, isLoaded } = useUser(); // get clerk user for clerkId
  const dispatch = useDispatch<AppDispatch>();
  const linkData = useSelector((state: RootState) => state.fetchLinkReducer.linkData);
  const countEnabledLinks = useSelector((state: RootState) => state.fetchLinkReducer.countEnabledLinks);
  // TODO: limit no. of links total
  const handleDeleteLink = (linkIdToDelete: string) => {
    // Filter out the link to be deleted based on its ID
    const updatedLinkData = linkData.filter(
      (link) => link.id !== linkIdToDelete
    );
    dispatch(setLinkData({ linkData: updatedLinkData, countEnabledLinks })); // Dispatch the action to update linkData
    dispatch(toggleBoolean()); // Dispatch the action to update linkData
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
    dispatch(setLinkData({ linkData: updatedLinkArray, countEnabledLinks })); // Dispatch the action to update linkData
  };
  // const handleAddLink = (linkToAdd: LinkWithoutUserId) => {
  //   setLinkData([...linkData, linkToAdd]);
  // };

  // TODO: determine to useMemo or useEffect
  useEffect(() => {
    if (isLoaded && user) {
      const fetchLinks = async () => {
        const linksObject = await getLinks(user.id);
        if (linksObject) {
          const countEnabledLinks = linksObject.links.filter((link) => link.enabled === true).length;
          dispatch(setLinkData({ linkData: linksObject.links, countEnabledLinks }));
        }
      };
      fetchLinks();
    }
  }, [user]);

  // TODO: Update this to an array , and limit total enabled links
  const [addOneLink, setAddOneLink] = useState<boolean>(false);

  const handleAddOneLink = () => {
    setAddOneLink(false);
  };
  return (
    <>
      <section>
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
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="bg-noto-purple border border-noto-purple hover:bg-[#12141F] text-white font-bold px-3 py-3 rounded min-w-full mx-auto"
            onClick={() => setAddOneLink(true)}
          >
            Add Link
          </button>
        </div>
        <div className="ml-2 mr-2">
          {/* New links to add */}
          {user && addOneLink && (
            <LinkFormComponent
              clerkId={user.id}
              handleAddOneLink={handleAddOneLink}
            />
          )}
          
        </div>
      </section>
    </>
  );
}
