// by default use server
import ProfilePageComponent from "@/components/profileComponent";
import { TagAccordion } from "@/components/tagAccordion";

export default async function Page() {
  return (
    <>
      <ProfilePageComponent />
      {/* 
        TODO: fix sizing....
      */}
      <div className="flex flex-col flex-grow-0 items-center justify-center  mt-3">
        <TagAccordion />
      </div>
    </>
  );
}
