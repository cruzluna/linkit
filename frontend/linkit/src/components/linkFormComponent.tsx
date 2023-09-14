import { Alert, Button, Switch } from "@material-tailwind/react";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Yup schema validation
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { addLink } from "@/app/actions/linksActions";
import { LinkWithoutUserId } from "./links";

// id,
// title,
// url,
// initialEnabled,

export type LinkFormValues = {
  title: string;
  url: string;
};

const schema = object().shape({
  title: string().min(3).max(20).required(),
  url: string().url().min(3).max(150).required(),
});

type LinkFormProps = {
  clerkId: string;
  handleAddOneLink: () => void;
  handleAddLink: (linkToAdd: LinkWithoutUserId) => void; // add link to state to avoid refresh
};
export default function LinkFormComponent({
  clerkId,
  handleAddOneLink,
  handleAddLink,
}: LinkFormProps): JSX.Element {
  const id = useId();
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);
  const [addLinkSuccess, setAddLinkSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LinkFormValues> = async (
    data: LinkFormValues
  ) => {
    // console.log(data);

    const result = await addLink(clerkId, data);
    if (result.link !== null) {
      setSubmitButtonDisabled(true);
      // set success alert
      setAddLinkSuccess(true);
      handleAddOneLink(); // get rid of link form
      // eslint-disable-next-line no-unused-vars
      const { userId, ...cleanLink } = result.link;
      handleAddLink(cleanLink);
    } else {
      setServerError(true);
    }
  };

  return (
    <form className="bg-[#1C202F] text-white px-3 py-3 rounded w-full md:w-1/3 mx-auto mt-5">
      {/* 
      <p>{JSON.stringify(watch(), null, 2)}</p>
      */}

      {addLinkSuccess && (
        <Alert
          color="green"
          open={addLinkSuccess}
          onClose={() => {
            setAddLinkSuccess(false);
          }}
        >
          Successfully added link
        </Alert>
      )}
      {serverError && (
        <Alert
          color="red"
          open={serverError}
          onClose={() => setServerError(false)}
        >
          Server error, try refreshing. Email notespaceai@gmail.com if issue
          persists.
        </Alert>
      )}
      {errors.title?.message && (
        <Alert color="red"> {errors.title?.message}</Alert>
      )}
      {errors.url?.message && <Alert color="red"> {errors.url?.message}</Alert>}
      <div>
        <input
          {...register("title")}
          type="text"
          id="title"
          className="bg-transparent mb-2 border border-gray-300 text-blue-gray-300 text-sm rounded-lg focus:ring-noto-purple focus:border-noto-purple block w-3/4 p-2.5 "
          placeholder="Link Title"
          required
        />
      </div>

      <div className="flex flex-row">
        <input
          {...register("url")}
          type="text"
          id="url"
          className="bg-transparent border border-gray-300 text-blue-gray-300 text-sm rounded-lg focus:ring-noto-purple focus:border-noto-purple block w-1/2 p-2.5 "
          placeholder="URL"
          required
        />
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={submitButtonDisabled}
          className="ml-3 bg-noto-purple"
        >
          Submit
        </Button>
      </div>
      <div className="font-medium flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0 md:mr-2 text-sm">{"-"}</div>
        <Switch id={id} color="green" defaultChecked disabled />
      </div>
    </form>
  );
}
