"use client";
import { useUser } from "@clerk/nextjs";
import logo from "../assets/logo.svg";
import Image from "next/image";
import PlatformNavbar from "@/components/platformnavbar";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
export default function ProfilePageComponent() {
  const user = useUser();
  console.log(user);
  // TODO: Update default profile image
  const userImage: string = user.user?.imageUrl ? user.user?.imageUrl : logo;
  return (
    <>
      <PlatformNavbar />
      <div className="flex  justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Create notespace profile
          </Typography>
          <Typography color="white" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" />
              <Input size="lg" label="Email" />
              <Input type="password" size="lg" label="Links" />
            </div>
            <Button className="mt-6 bg-noto-purple" fullWidth>
              Update
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
