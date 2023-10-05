"use client";
import { useDispatch } from 'react-redux';
import { toggleBoolean} from '@/redux/features/booleanSlice';
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
import { useState, useId, useEffect } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";

// actions
import {
  // FormValRequired,
  getUserValuesForProfile,
  submitProfileForm,
  updateToolsAction,
} from "@/app/actions/profileForm";
// Yup schema validation
import { yupResolver } from "@hookform/resolvers/yup";

import { object, string, array } from "yup";
import { GoAlert } from "react-icons/go";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { ErrorModal } from "./errorModal";
import Links from "./links";
import Link from "next/link";
import { RootState } from '@/redux/store';

export type FormValues = {
  name: string;
  headline: string;
  tools: string[];
};

const schema = object().shape({
  name: string().max(50, "Name can only be 50 characters long").required(),
  headline: string().max(40, "Headline can only be 15 ch").required(),
  tools: array().of(string().required()).min(1).max(5).required(),
});

export default function ProfilePageComponent() {
  const dispatch = useDispatch();
  const { user } = useUser(); // get clerk user for clerkId
  const [clerkUsername, setClerkUsername] = useState<string>("");
  const [existingUserToolArray, setExsitingToolArray] = useState<
    [id: string, toolName: string][]
  >([]);

  const id = useId();
  useEffect(() => {
    if (user) {
      const fetchFormValues = async () => {
        const vals = await getUserValuesForProfile(user.id);
        if (vals !== null) {
          // console.log("USEEFF", vals);
          reset({
            name: vals.name,
            headline: vals.headline,
            tools: vals.tools.map((toolList) => toolList.toolItem),
          });
          setExsitingToolArray(
            vals.tools.map((toolList) => [toolList.id, toolList.toolItem])
          );
        }
      };
      fetchFormValues();
      const userNameString: string = user?.username ? user.username : "";
      setClerkUsername(userNameString);
    }
  }, [user]);
  // ----------form----------------

  const {
    handleSubmit,
    control,
    // watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all", // needed for alert
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      headline: "",
    },
  });

  const { append: toolsAppend, remove: toolsRemove } = useFieldArray({
    control,
    name: "tools",
  } as never);

  // ---------tag display----------------
  // const handleKeyDownTags = async (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     handleTagAddButton();
  //   }
  // };
  // const handleTagAddButton = async () => {
  //   const tagVal = getValues("temporaryTag");
  //
  //   const valid = await trigger("temporaryTag");
  //   if (tagVal && valid) {
  //     tagAppend(tagVal);
  //     setValue("temporaryTag", "");
  //   } else {
  //     return;
  //   }
  // };

  // ---------link display----------------
  // const handleKeyDownLinks = async (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     handleLinkAddButton();
  //   }
  // };
  // const handleLinkAddButton = async () => {
  //   const linkVal = getValues("temporaryLink");
  //   const valid = await trigger("temporaryLink");
  //   if (linkVal && valid) {
  //     linkAppend(linkVal);
  //     setValue("temporaryLink", "");
  //     unregister("temporaryLink"); // need this to prevent invalid url on Submit
  //   } else {
  //     //todo: set error
  //     return;
  //   }
  // };
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
  const toolSet = new Set<string>([
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
  ]);

  // username alert icon, inside input
  // TODO: timeout for update button
  // const [submitButtonDisabled, setSubmitButtonDisabled] =
  //   useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const handleErrorModal = () => {
    setFormError(false);
  };

  const isToolChecked = (toolArr: string[], tool: string): boolean => {
    try {
      return toolArr.includes(tool);
    } catch {
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // console.log(data);

    if (user && clerkUsername != "") {
      const result = await submitProfileForm(data, user.id, clerkUsername);
      const toolsResult = await updateToolsAction(
        user.id,
        existingUserToolArray,
        data.tools
      );

      // console.log(result);
      if (result.user !== null) {
        // TODO: submit button time out
        // setSubmitButtonDisabled(true);
        dispatch(toggleBoolean());
        setFormSuccess(true);
      } else {
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
        This is how you can view the form state. Paste it below this comment block. 
      <div className="flex items-center justify-center">
        <p className="text-white">{JSON.stringify(watch(), null, 2)}</p>
      </div>
      */}

      <div className="flex  justify-center">
        <Card color="transparent" shadow={false}>
          <div className="ml-6">
          <Typography variant="h4" color="white">
            Edit notespace profile
          </Typography>
          <Typography color="white" className="mt-1 mb-5 font-normal">
            Enter your details. (To change username, click user icon)
          </Typography>
          <h1 className="mb-8">
            your website is active at{" "}
            <Link
              className="text-gray-400 underline hover:text-gray-300"
              href={"/" + clerkUsername}
            >
              https://www.notespace.ai/{clerkUsername}
            </Link>
          </h1>
          </div>
          <form className="mt-8 mb-2 w-80 mx-auto max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              {/*Errors*/}

              {formSuccess && (
                <Alert
                  color="green"
                  open={formSuccess}
                  onClose={() => setFormSuccess(false)}
                >
                  User profile successfully updated
                </Alert>
              )}
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

              <Input
                size="lg"
                color="white"
                label="notespace.ai/[username] "
                defaultValue={clerkUsername}
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

            <div className="flex flex-col justify-center">
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
                      key={index}
                      control={control}
                      render={({ field: { value } }) => (
                        <ListItem key={index} className="p-0">
                          <div
                            onClick={() => {
                              const toolsArr = getValues("tools");
                              const isChecked = isToolChecked(toolsArr, tool);
                              if (isChecked) {
                                // Remove the tool if it's already checked
                                toolsRemove(
                                  toolsArr.findIndex((item) => item === tool)
                                );
                              } else {
                                // Add the tool if it's not checked
                                toolsAppend(tool);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Checkbox
                                id={`checkbox-${index}`}
                                ripple={false}
                                checked={isToolChecked(
                                  getValues("tools"),
                                  tool
                                )}
                                onChange={() => {
                                  const toolsArr = getValues("tools");
                                  const isChecked = isToolChecked(
                                    toolsArr,
                                    tool
                                  );
                                  if (isChecked) {
                                    // Remove the tool if it's already checked
                                    toolsRemove(
                                      toolsArr.findIndex(
                                        (item) => item === tool
                                      )
                                    );
                                  } else {
                                    // Add the tool if it's not checked
                                    toolsAppend(tool);
                                  }
                                }}
                                value={value}
                                color="gray"
                                className="hover:before:opacity-0 border-noto-purple"
                                containerProps={{
                                  className: "p-0",
                                  onClick: (e: {
                                    stopPropagation: () => void;
                                  }) => {
                                    // Prevent the parent div's click event from firing
                                    e.stopPropagation();
                                  },
                                }}
                              />
                            </ListItemPrefix>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              {tool}
                            </Typography>
                          </div>
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
          <div className="p-4 mt-3">
                <Links />
              </div>
        </Card>
      </div>
    </>
  );
}
