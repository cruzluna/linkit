"use client";
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
  Alert,
} from "@material-tailwind/react";
import { useState, KeyboardEvent, useId } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { TagComponent } from "./tagDisplayComponent";
// actions
import { submitProfileForm } from "@/app/actions/profileForm";
// Yup schema validation
import { yupResolver } from "@hookform/resolvers/yup";

import { object, string, array } from "yup";
import { GoAlert } from "react-icons/go";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { ErrorModal } from "./errorModal";

export type FormValues = {
  name: string;
  headline: string;
  tags: string[];
  tools: string[];
  temporaryTag: string | undefined;
};

const schema = object().shape({
  name: string().max(50, "Name can only be 50 characters long").required(),
  headline: string().max(40, "Headline can only be 15 ch").required(),
  tags: array().of(string().required()).min(1).max(3).required(),
  tools: array().of(string().required()).min(1).max(5).required(),
  temporaryTag: string()
    .max(10, "Each tag can only  be 10 characters long")
    .optional(),
});

export default function ProfilePageComponent() {
  const { user } = useUser(); // get clerk user for clerkId

  const id = useId();
  // ----------form----------------
  let clerkUsername: string = user?.username ? user.username : "";

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    setError,
    trigger,
    unregister,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all", // needed for alert
    resolver: yupResolver(schema),
  });

  const { append: tagAppend, remove: tagRemove } = useFieldArray({
    control,
    name: "tags",
  } as never);

  // const { append: linkAppend, remove: linkRemove } = useFieldArray({
  //   control,
  //   name: "links",
  // } as never);
  const { append: toolsAppend, remove: toolsRemove } = useFieldArray({
    control,
    name: "tools",
  } as never);

  // ---------tag display----------------
  const handleKeyDownTags = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTagAddButton();
    }
  };
  const handleTagAddButton = async () => {
    const tagVal = getValues("temporaryTag");

    const valid = await trigger("temporaryTag");
    if (tagVal && valid) {
      tagAppend(tagVal);
      setValue("temporaryTag", "");
    } else {
      return;
    }
  };

  // ---------link display----------------
  const handleKeyDownLinks = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLinkAddButton();
    }
  };
  const handleLinkAddButton = async () => {
    const linkVal = getValues("temporaryLink");
    const valid = await trigger("temporaryLink");
    if (linkVal && valid) {
      linkAppend(linkVal);
      setValue("temporaryLink", "");
      unregister("temporaryLink"); // need this to prevent invalid url on Submit
    } else {
      //todo: set error
      return;
    }
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
  // username alert icon, inside input
  // TODO: move useUser to server component?
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);

  const handleErrorModal = () => {
    setFormError(false);
  };
  // let errorMessage: string = "";
  // const isToolChecked = (toolArr: string[], tool: string): boolean => {
  //   try {
  //     return toolArr.includes(tool);
  //   } catch {
  //     return false;
  //   }
  // };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log(data);

    if (user && clerkUsername != "") {
      const result = await submitProfileForm(data, user.id, clerkUsername);
      // console.log(result);
      if (result.user !== null) {
        // TODO: submit button time out
        setSubmitButtonDisabled(true);
        // console.log("BUTTON DISABLED");
      } else {
        // errorMessage = result.error as string;
        setFormError(true); // pop up error modal
      }
    } else {
      setFormError(true); // pop up error modal
    }
  };
  return (
    <>
      <div>
        {formError && <ErrorModal open={formError} onOpen={handleErrorModal} />}
      </div>
      {/*  
        This is how you can view the form state
      <div className="flex items-center justify-center">
        <p className="text-white">{JSON.stringify(watch(), null, 2)}</p>
      </div>
      */}

      <div className="flex items-center justify-center">
        <p className="text-white">{JSON.stringify(watch(), null, 2)}</p>
      </div>
      <div className="flex  justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Edit notespace profile
          </Typography>
          <Typography color="white" className="mt-1 font-normal">
            Enter your details. (To change username, click user icon)
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              {/*Errors*/}
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <Alert
                      key={type}
                      color="red"
                      icon={<GoAlert size={"1.5rem"} />}
                    >
                      {message}
                    </Alert>
                  ))
                }
              />
              <ErrorMessage
                errors={errors}
                name="headline"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <Alert
                      key={type}
                      color="red"
                      icon={<GoAlert size={"1.5rem"} />}
                    >
                      {message}
                    </Alert>
                  ))
                }
              />

              <ErrorMessage
                errors={errors}
                name="tags"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <Alert
                      key={type}
                      color="red"
                      icon={<GoAlert size={"1.5rem"} />}
                    >
                      {message}
                    </Alert>
                  ))
                }
              />

              <ErrorMessage
                errors={errors}
                name="tools"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <Alert
                      key={type}
                      color="red"
                      icon={<GoAlert size={"1.5rem"} />}
                    >
                      {message}
                    </Alert>
                  ))
                }
              />

              <ErrorMessage
                errors={errors}
                name="temporaryTag"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <Alert
                      key={type}
                      color="red"
                      icon={<GoAlert size={"1.5rem"} />}
                    >
                      {message}
                    </Alert>
                  ))
                }
              />

              <Input
                size="lg"
                color="white"
                label="notespace.ai/[username] "
                value={clerkUsername}
                icon={<AiOutlineCheckCircle className="fill-green-500" />}
                readOnly
              />
              {/* TODO: Helper text*/}
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
                type="button"
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
                    <Controller
                      name="tools"
                      control={control}
                      render={({ field: { value } }) => (
                        <ListItem key={index} className="p-0">
                          <label
                            htmlFor="horizontal-list-react"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Checkbox
                                id={id}
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
                            </ListItemPrefix>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              {tool}
                            </Typography>
                          </label>
                        </ListItem>
                      )}
                    />
                  ))}
                </List>
              </Card>
            </Collapse>

            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={false}
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
