"use client";
import PlatformNavbar from "@/components/platformnavbar";
// import {IconComponent } from "@/assets/iconMap";
import {
  Card,
  Checkbox,
  Collapse,
  Input,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useState, KeyboardEvent } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { TagComponent } from "./tagDisplayComponent";
import { LinkComponent } from "./linkDisplayComponent";
import {
  isUsernameAvailable,
  submitProfileForm,
} from "@/app/actions/profileForm";

export type FormValues = {
  username: string;
  name: string;
  headline: string;
  tags: string[];
  links: string[];
  tools: string[];
  temporaryTag: string;
  temporaryLink: string;
};

export default function ProfilePageComponent() {
  // ----------form----------------

  const { handleSubmit, control, watch, getValues, setValue } =
    useForm<FormValues>();
  const {
    fields: tagField,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: "tags" } as never);

  const {
    fields: linkField,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({ control, name: "links" } as never);
  const {
    fields: toolsField,
    append: toolsAppend,
    remove: toolsRemove,
  } = useFieldArray({ control, name: "tools" } as never);

  // ---------tag display----------------
  const handleKeyDownTags = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTagAddButton();
    }
  };
  const handleTagAddButton = () => {
    const tagVal = getValues("temporaryTag");

    if (typeof tagVal !== "string") {
      return;
    }

    const trimmedTag = tagVal.trim();
    if (trimmedTag.length === 0) {
      return;
    }
    // TODO: Limit number of tags and check if valid
    tagAppend(tagVal);
    setValue("temporaryTag", "");
  };

  // ---------link display----------------
  const handleKeyDownLinks = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLinkAddButton();
    }
  };
  const handleLinkAddButton = () => {
    const linkVal = getValues("temporaryLink");

    if (typeof linkVal !== "string") {
      return;
    }

    const linkTrimmed = linkVal.trim();
    if (linkTrimmed.length === 0) {
      return;
    }
    // TODO: Limit number of links and check if valid
    linkAppend(linkTrimmed);
    setValue("temporaryLink", "");
  };
  // ---------collapse----------------
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  // -------------------------

  const toolList: string[] = [
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
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);

    submitProfileForm(data);
  };
  return (
    <>
      <PlatformNavbar />
      <div className="flex items-center justify-center">
        <p className="text-white">{JSON.stringify(watch(), null, 2)}</p>
      </div>
      <div className="flex  justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Create notespace profile
          </Typography>
          <Typography color="white" className="mt-1 font-normal">
            Enter your details.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    color="white"
                    label="Unique username"
                    onChange={onChange}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      isUsernameAvailable(e.target.value).then((username) => {
                        console.log(username);
                        if (username) {
                          console.log("Username not unique");
                        } else {
                          console.log("Username available");
                        }
                      });
                      // console.log("USERNAME: ", username);
                      // if (!username) {
                      //   console.log("FALSE");
                      // } else {
                      //   console.log("TRUE");
                      // }
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    color="white"
                    label="Name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="headline"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    color="white"
                    label="Headline"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Controller
                control={control}
                name="temporaryTag"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Add up to 3 tags"
                    color="white"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={handleKeyDownTags}
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                )}
              />
              <Button
                size="sm"
                disabled={false}
                className="!absolute right-1 top-1 rounded bg-noto-purple"
                onClick={handleTagAddButton}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <TagComponent
                tagsToShow={getValues("tags")}
                removeTag={tagRemove}
              />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Controller
                control={control}
                name="temporaryLink"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Add up to 5 links"
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDownLinks}
                    className="pr-20"
                    color="white"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                )}
              />
              <Button
                size="sm"
                disabled={false}
                className="!absolute right-1 top-1 rounded bg-noto-purple"
                onClick={handleLinkAddButton}
              >
                Add
              </Button>
            </div>
            <div className="flex-col items-center gap-2 py-2">
              <LinkComponent
                linksToShow={getValues("links")}
                removeLink={linkRemove}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
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
                  {toolList.map((tool, index) => (
                    <ListItem key={index} className="p-0">
                      <label
                        htmlFor="horizontal-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Controller
                            name="tools"
                            control={control}
                            render={({ field: { value } }) => (
                              <Checkbox
                                id="horizontal-list-react"
                                ripple={false}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // add it to tools array
                                    toolsAppend(tool);
                                  } else {
                                    // remove from tools array
                                    const toolsArr = getValues("tools");
                                    toolsRemove(
                                      toolsArr.findIndex(
                                        (item) => item === tool
                                      )
                                    );
                                  }
                                }}
                                value={value}
                                color="gray"
                                className="hover:before:opacity-0 border-noto-purple"
                                containerProps={{
                                  className: "p-0",
                                }}
                              />
                            )}
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

            <Button
              onClick={handleSubmit(onSubmit)}
              className="mt-6 bg-noto-purple "
              fullWidth
            >
              Update
            </Button>
            {/*Icon hashmap proof of concept */}
          </form>
        </Card>
      </div>
    </>
  );
}
