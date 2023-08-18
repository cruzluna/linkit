"use client";
import PlatformNavbar from "@/components/platformnavbar";
import { IconComponent, getIcon } from "@/assets/iconMap";
import {
  Card,
  CardBody,
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
                  className="bg-noto-purple"
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
                  className="bg-noto-purple m-2 lowercase"
                  value={link}
                />
              ))}
            </div>
            <Button variant="outlined" onClick={toggleOpen}>
              Select tools
            </Button>
            <Collapse open={open}>
              <Card className="w-full max-w-[24rem]">
                <List className="flex-row">
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-react"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        React.js
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-vue"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-vue"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Vue.js
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="horizontal-list-svelte"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="horizontal-list-svelte"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Svelte.js
                      </Typography>
                    </label>
                  </ListItem>
                </List>
              </Card>
            </Collapse>
            <Button className="mt-6 bg-noto-purple " fullWidth>
              Update
            </Button>
            {/*Icon hashmap proof of concept */}
            <IconComponent
              iconKey={""}
              className={"fill-white"}
              size="1.5rem"
            />
          </form>
        </Card>
      </div>
    </>
  );
}
