import { Alert, Button } from "@material-tailwind/react";
// import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Yup schema validation
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { addTag } from "@/app/actions/tagActions";
import { useState } from "react";
import { TagWithoutUserId } from "./tagAccordion";

interface tagProps {
  clerkId: string;
  handleAddTag: (tagToAdd: TagWithoutUserId) => void; // add tag to state to prevent reload
  handleAddOneTag: () => void; // enables/disabled form view
  handleUpdateTag?: () => void; // TODO: create a form comp.
}

export type TagFormValues = {
  skill: string;
};

const schema = object().shape({
  skill: string().min(2).max(10).required(),
});

export const TagFormComponent = ({
  clerkId,
  handleAddTag,
  handleAddOneTag,
}: tagProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TagFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const [addTagSuccess, setAddTagSuccess] = useState<boolean>(false);
  const onSubmit: SubmitHandler<TagFormValues> = async (
    data: TagFormValues
  ) => {
    // console.log(data);

    const result = await addTag(clerkId, data);
    if (result.tag !== null) {
      setSubmitButtonDisabled(true);
      // set success alert
      setAddTagSuccess(true);
      handleAddOneTag(); // get rid of tag form

      // eslint-disable-next-line no-unused-vars
      const { userId, ...cleanTag } = result.tag;
      handleAddTag(cleanTag);
    } else {
      setServerError(true);
    }
  };

  return (
    <>
      <div>
        <p>{JSON.stringify(watch(), null, 2)}</p>

        {errors.skill?.message && (
          <Alert color="red"> {errors.skill?.message}</Alert>
        )}

        {addTagSuccess && (
          <Alert
            color="green"
            open={addTagSuccess}
            onClose={() => {
              setAddTagSuccess(false);
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
      </div>
      <form className=" flex flex-col-1 w-3/4 items-center justify-center bg-transparent border border-noto-purple uppercase whitespace-nowrap  text-white py-1.5 px-3 rounded-lg  font-light text-base mb-2 truncate">
        <input
          {...register("skill")}
          className="bg-transparent border-none  rounded-lg w-full"
          placeholder="Add Tag"
        />
        <Button
          className="ml-2 bg-transparent border border-noto-purple"
          onClick={handleSubmit(onSubmit)}
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
