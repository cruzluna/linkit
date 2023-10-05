import { Alert, Button, Switch } from "@material-tailwind/react";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Yup schema validation
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, object, string } from "yup";
import { addLink } from "@/app/actions/linksActions";
import { LinkWithoutUserId } from "./links";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setLinkData } from "@/redux/features/fetchLinkSlice";
import { FaWindowClose } from "react-icons/fa";
import { toggleBoolean } from '@/redux/features/booleanSlice';

// id,
// title,
// url,
// initialEnabled,

export type LinkFormValues = {
  title: string;
  url: string;
  enabled: boolean;
};

const schema = object().shape({
  title: string().min(3).max(30).required(),
  url: string().url().min(3).max(150).required(),
  enabled: boolean().required(),
});

type LinkFormProps = {
  clerkId: string;
  handleAddOneLink: () => void;
};
export default function LinkFormComponent({
  clerkId,
  handleAddOneLink,
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

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);
  const [addLinkSuccess, setAddLinkSuccess] = useState<boolean>(false);
  const [showEnableAlert, setShowEnableAlert] = useState<boolean>(false); // TODO: remove this, use countEnabledLinks instead
  const [enabled, setEnabled] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const countEnabledLinks = useSelector((state: RootState) => state.fetchLinkReducer.countEnabledLinks);
  const linkData = useSelector((state: RootState) => state.fetchLinkReducer.linkData);

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
      if (cleanLink.enabled) {
        dispatch(toggleBoolean());
        dispatch(setLinkData({ linkData: [...linkData, cleanLink], countEnabledLinks: countEnabledLinks + 1 }));
      } else {
        dispatch(setLinkData({ linkData: [...linkData, cleanLink], countEnabledLinks: countEnabledLinks }));
      }
    } else {
      setServerError(true);
    }
  };

  const handleEnableAlert = () => {
    setEnabled(false)
    setShowEnableAlert(true);
    setTimeout(() => {
      setShowEnableAlert(false);
    }, 3000);
  };

  return (
    <form className="bg-[#1C202F] text-white px-3 py-3 rounded w-full md:min-w-full mx-auto mt-5">
      {/* 
      <p>{JSON.stringify(watch(), null, 2)}</p>
      */}
      <div className="close flex justify-end pt-2 pb-4">
        <FaWindowClose className="text-2xl text-white cursor-pointer" onClick={handleAddOneLink} />
      </div>
      {showEnableAlert && (
        <div className="mb-3">
          <Alert
            color="red"
            open={showEnableAlert}
          >
            You have reached the maximum number of enabled links. Please disable a link to enable another.
          </Alert>
        </div>
      )}

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
          Must update your profile before adding links! Server error, try
          refreshing. Email notespaceai@gmail.com if issue persists.
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
        <Switch
          id="enabled"
          color="green"
          checked={enabled}
          {...register("enabled")}
          onChange={() => { countEnabledLinks < 5 ? setEnabled(!enabled) : handleEnableAlert() }}
        />
      </div>
    </form>
  );
}
