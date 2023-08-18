"use client";
import PlatformNavbar from "@/components/platformnavbar";
// import {IconComponent } from "@/assets/iconMap";
import {
  Card,
  Checkbox,
  Collapse,
  Chip,
  Input,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { useState } from "react";
export default function ProfilePageComponent() {
  const [tag, setTags] = useState<string>("");
  const onChange = ({ target }) => setTags(target.value);
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  const temporaryTags: string[] = ["AI/ML", "Frontend", "Backend"];
  const temporaryLinks: string[] = [
    "www.linkedin.com",
    "https://github.com/cruzluna",
    "x.com/@yv",
  ];

  const temporaryTools: string[] = [
    "Python",
    "Golang",
    "C++",
    "AWS",
    "Google Cloud",
    "Typescript",
    "node.js",
    "Rust",
    "OCaml",
    "Photoshop",
    "chatGPT",
    "Vim",
    "neoVim",
    "VsCode",
  ];
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
            Enter your details.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" />
              <Input size="lg" label="Headline" />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                label="Add up to 3 tags"
                value={tag}
                onChange={onChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                disabled={false}
                className="!absolute right-1 top-1 rounded bg-noto-purple"
              >
                Add
              </Button>
            </div>
            <div className="flex gap-2 py-2">
              {temporaryTags.map((tag, index) => (
                <Chip
                  key={index}
                  open={true}
                  onClose={() => null}
                  className="bg-noto-purple font-light text-base"
                  value={tag}
                />
              ))}
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                label="Add up to 5 links"
                value={tag}
                onChange={onChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                disabled={false}
                className="!absolute right-1 top-1 rounded bg-noto-purple"
              >
                Add
              </Button>
            </div>
            <div className="flex-col items-center gap-2 py-2">
              {temporaryLinks.map((link, index) => (
                <Chip
                  key={index}
                  open={true}
                  onClose={() => null}
                  className="bg-noto-purple m-2 lowercase font-light text-base"
                  value={link}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                color="white"
                variant="outlined"
                onClick={toggleOpen}
                fullWidth
              >
                Select tools
              </Button>
            </div>
            <Collapse open={open}>
              <Card className="w-full max-w-[24rem]">
                <List className="flex flex-wrap">
                  {temporaryTools.map((tool, index) => (
                    <ListItem key={index} className="p-0">
                      <label
                        htmlFor="horizontal-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            id="horizontal-list-react"
                            ripple={false}
                            color="gray"
                            className="hover:before:opacity-0 border-noto-purple"
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {tool}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Collapse>

            <Button className="mt-6 bg-noto-purple " fullWidth>
              Update
            </Button>
            {/*Icon hashmap proof of concept */}
          </form>
        </Card>
      </div>
    </>
  );
}
