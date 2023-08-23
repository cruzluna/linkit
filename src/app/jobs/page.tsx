"use client";
import PlatformNavbar from "@/components/platformnavbar";
import JobChip from "@/components/job";
import { Button, Tooltip } from "@material-tailwind/react";

export default function Page() {
  return (
    <>
      <PlatformNavbar />
      <div className="text-3xl font-bold text-center my-4 md:text-4xl lg:text-5xl text-[#FAFAFA]">
        Recommended Jobs
      </div>
      <JobChip
        jobName="Backend Engineer"
        companyName="Plaid"
        datePosted="08/23/2023"
        applicationUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <JobChip
        jobName="Backend Engineer"
        companyName="Plaid"
        datePosted="08/23/2023"
        applicationUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <div className="flex justify-center mt-10">
        <Tooltip content="Beta...Coming soon">
          {/* Center the save button */}
          <Button
            type="button"
            className="bg-noto-purple lg:inline-block border border-noto-purple hover:bg-[#12141F] text-white font-bold px-9 py-3 rounded"
          >
            Generate More
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
