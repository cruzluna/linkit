import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

interface UserNullProps {
  user: string;
}

const UserNull = ({ user }: UserNullProps) => {
  return (
    <div className="min-h-screen text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <figure className="p-6">
          <div className="rounded-full w-32 h-32 mx-auto bg-noto-purple bg-opacity-50 flex justify-center items-center">
            <FaUser className="h-12 w-12 text-gray-300" />
          </div>
          <div className="pt-6 text-center space-y-4">
            <figcaption className="font-medium"></figcaption>
            <div>
              <p className="text-2xl">
                User with username <span className="font-bold">{user}</span> does not exist.
              </p>
              <p className="text-md text-gray-600 m-1">
                 Please check the username and try again.
                </p>
                <p className="text-sm text-gray-600">
                 Not a user? <Link href= "/" className="underline text-gray-500" > Login here</Link> 
                </p>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}

export default UserNull;
