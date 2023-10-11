"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUser } from "@/app/actions/profileForm";
import Notespace from "@/components/notespace";
import ProfilePageComponent from "@/components/profileComponent";
import { TagAccordion } from "@/components/tagAccordion";
import Loading from "@/app/[userID]/loading";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/interfaces/User";
import { useRouter } from 'next/navigation';
import Links from "@/components/links";

interface RootState {
  boolean: {
    booleanValue: boolean;
  };
}

export default function Page() {
  const { user: clerkuser } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [showNoteSpace, setShowNoteSpace] = useState(true);
  const UpdateDashboard = useSelector(
    (state: RootState) => state.boolean.booleanValue
  );
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    const username = clerkuser?.username as string;
    if (!username) {
      router.push('/');
      return;
    }

    const fetchClerkUser = async () => {
      const user = await getUser(username);
      setUserData(user);
    };

    if (userData) {
    }
    fetchClerkUser();
  }, [clerkuser, UpdateDashboard]);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(min-width: 1188px)");

  //   // Update the showNoteSpace state based on the screen size
  //   const handleMediaChange = (event: any) => {
  //     setShowNoteSpace(!event.matches);
  //   };

  //   // Attach the event listener
  //   mediaQuery.addEventListener("change", handleMediaChange);

  //   // Check the initial screen size
  //   handleMediaChange(mediaQuery);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaChange);
  //   };
  // }, []);


  return (
    <div className="mainWrapper flex lg:pl-20 pb-10">
      <div className="lg:w-1/2  mx-auto flex flex-col space-y-8">
        <ProfilePageComponent />
        <Links />
      </div>
      <div className="previewProfile w-1/2 hidden lg:block ">
        <div className="phone w-[28rem] mx-auto rounded-[5rem] bg-gray-500 border-[1rem] border-black">
          <div className="camera bg-black mx-auto rounded-b-3xl black h-10 w-1/2"></div>
          {userData ? (
            <Notespace
              user={userData}
              profileImage={clerkuser?.imageUrl}
              params={clerkuser?.username}
            />
          ) : (
            !showNoteSpace && <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
