// by default use server
import ProfilePageComponent from "@/components/profileComponent";
// import { TagAccordion } from "@/components/tagAccordion";

export default async function Page() {
  // TODO: disable if user already has a profile?
  return (
    <>
      <ProfilePageComponent />
      {/* 
        TODO: implement
      <TagAccordion />
      */}
    </>
  );
}
