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
import { useState, KeyboardEvent } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { TagComponent } from "./tagDisplayComponent";

type FormValues = {
  name: string;
  headline: string;
  tags: string[];
  links: string;
  tools: string;
  temporaryTag: string;
  temporaryLink: string;
};

export default function ProfilePageComponent() {
  // ----------form----------------

  const { handleSubmit, control, watch, getValues, setValue } =
    useForm<FormValues>();
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: "tags" } as never);

  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({ control, name: "links" } as never);

  // ---------tag display----------------
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
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

  // ---------collapse----------------
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  // -------------------------
  // const temporaryTags: string[] = ["AI/ML", "Frontend", "Backend"];
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
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
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
                    onKeyDown={handleKeyDown}
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
            <div className="flex gap-2 py-2">
              <TagComponent
                tagsToShow={getValues("tags")}
                removeTag={tagRemove}
              />
            </div>
            <div className="relative flex w-full max-w-[24rem]">
              <Controller
                control={control}
                name="links"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Add up to 5 links"
                    value={value}
                    onChange={onChange}
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
                          <Controller
                            name="tools"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Checkbox
                                id="horizontal-list-react"
                                ripple={false}
                                onChange={onChange}
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
