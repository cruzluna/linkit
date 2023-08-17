"use client";
import PlatformNavbar from "@/components/platformnavbar";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { VscGithubInverted as VscGithub } from "react-icons/vsc";

import { useState } from "react";
export default function ProfilePageComponent() {
  const [email, setEmail] = useState<string>("");
  const onChange = ({ target }) => setEmail(target.value);
  // const user = useUser();
  // console.log(user);
  // TODO: Update default profile image
  // const userImage: string = user.user?.imageUrl ? user.user?.imageUrl : logo;
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
              <Input size="lg" label="Links" />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type="email"
                label="Email Address"
                value={email}
                onChange={onChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={email ? "gray" : "blue-gray"}
                disabled={!email}
                className="!absolute right-1 top-1 rounded"
              >
                Invite
              </Button>
            </div>
            <Button className="mt-6 bg-noto-purple " fullWidth>
              Update
            </Button>
            <VscGithub />
          </form>
        </Card>
      </div>
    </>
  );
}
