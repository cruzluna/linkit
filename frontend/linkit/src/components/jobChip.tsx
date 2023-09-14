import { jobAppProps } from "@/interfaces/jobappProps";
// import React from 'react' // I dont think this import is being used

export default function JobChip({
  jobName,
  companyName,
  datePosted,
  applicationUrl,
}: jobAppProps) {
  return (
    <div className="bg-[#1C202F] rounded p-4 text-[#FAFAFA] max-w-md mx-auto mt-10">
      <div className="text-2xl font-bold text-left">{jobName}</div>
      <div className="flex justify-between">
        <div className="text-md font-semibold">{companyName}</div>
        <div className="text-md text-right font-semibold">
          <a href={applicationUrl}>Apply Now-&gt;</a>
        </div>
      </div>
      <div className="text-left">{datePosted}</div>
    </div>
  );
}
