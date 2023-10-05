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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1188px)");

    // Update the showNoteSpace state based on the screen size
    const handleMediaChange = (event: any) => {
      setShowNoteSpace(!event.matches);
    };

    // Attach the event listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Check the initial screen size
    handleMediaChange(mediaQuery);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);


  return (
    
    <div className="grid grid-cols-1 mt-10 justify-center items-center">
      <div className="grid m-auto h-auto lg:grid-cols-3">
        <div className="col-span-2 grid grid-rows-2">
          <div className="row-span-1">
            <ProfilePageComponent />

            <div className="flex flex-col items-center justify-center mt-3">
              <TagAccordion />
            </div>
          </div>
        </div>
        {!showNoteSpace && userData ? (
          <div className="col-span-1 border mr-10 border-gray-500 shadow-xl example h-[80vh] rounded-xl px-1">
            <div style={{ maxHeight: "79vh", overflow: "auto", padding: 15 }}>
              <Notespace
                user={userData }
                profileImage={clerkuser?.imageUrl}
                params={clerkuser?.username}
              />
            </div>
          </div>
        ) : (
          !showNoteSpace && <Loading />
        )}
      </div>
    </div>
  );
}
