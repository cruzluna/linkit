// "use client"; // remove from child https://github.com/vercel/next.js/discussions/46795#discussioncomment-5248407
import { deleteLink, updateLinkEnabled } from "@/app/actions/linksActions";
import { LinkStatProps } from "@/interfaces/linkStatsProps";
import {
  Alert,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import EditLinkComponent from "./editLinkComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LinkWithoutUserId } from "./links";
import { setLinkData } from "@/redux/features/fetchLinkSlice";
import { toggleBoolean } from "@/redux/features/booleanSlice";

export default function Link({
  id,
  title,
  url,
  initialEnabled,
  handleDeleteLink,
  handleUpdateLink,
}: LinkStatProps): JSX.Element {
  // const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const [editing, setEditing] = useState<boolean>(false);
  const dispatch = useDispatch()
  const countEnabledLinks = useSelector((state: RootState) => state.fetchLinkReducer.countEnabledLinks);
  const linkData = useSelector((state: RootState) => state.fetchLinkReducer.linkData);
  const [showEnableAlert, setShowEnableAlert] = useState<boolean>(false);
  const [status, setStatus] = useState(initialEnabled)
  const handleSetEditing = () => {
    setEditing(false);
  };

  function updateLinkData(linkData: LinkWithoutUserId[], cleanLink: LinkWithoutUserId) {
    return linkData.map((link) => {
      if (link.id === cleanLink.id) {
        // Update the matching link with the cleanLink data
        return cleanLink;
      }
      // Leave other links unchanged
      return link;
    });
  }


  const handleEnableDisableLink = async (newEnabled: boolean) => {
    setStatus(newEnabled)
    const result = await updateLinkEnabled(id, newEnabled);

    if (result.link !== null) {
      const { userId, ...cleanLink } = result.link;
      if (cleanLink) {
        const newLinkData = updateLinkData(linkData, cleanLink);
        if (newEnabled) {
          dispatch(setLinkData({ linkData: newLinkData, countEnabledLinks: countEnabledLinks + 1 })); // Dispatch the action to update linkData
        } else {
          dispatch(setLinkData({ linkData: newLinkData, countEnabledLinks: countEnabledLinks - 1 })); // Dispatch the action to update linkData
        }
      }
    }
  }

  const handleEnableAlert = () => {
    setStatus(false)
    setShowEnableAlert(true)
    setTimeout(() => {
      setShowEnableAlert(false)
    }, 3000);
  };

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  if (!editing) {
    return (
      <div className="bg-[#1C202F] text-white px-3 py-3 rounded w-full md:min-w-full mx-auto mt-5">
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
        <Popover open={openPopover} handler={setOpenPopover}>
          <PopoverHandler>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              <BsTrash size="1.5em" />
            </button>
          </PopoverHandler>
          <PopoverContent>
            Are you sure you want to delete?
            <div className="flex flex-row items-center justify-center gap-2">
              <Button
                className="bg-noto-purple"
                onClick={() => {
                  deleteLink(id);
                  handleDeleteLink(id); // updates state
                }}
              >
                Yes
              </Button>
              <Button
                className="bg-noto-purple"
                onClick={() => setOpenPopover(false)}
              >
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <button
          type="button"
          className="text-white border-2 border-noto-purple hover:bg-purple-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={() => setEditing(true)}
        >
          <AiOutlineEdit size="1.5em" />
        </button>
        <div className="font-bold text-xl md:text-lg truncate">{title}</div>
        <div className="font-medium text-base md:text-sm truncate">{url}</div>

        <div className="font-medium flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0 md:mr-2 text-sm">{"-"}</div>
          <Switch
            id={id}
            color="green"
            checked={status}
            onChange={(e) => {
              const newEnabled = e.target.checked;
              dispatch(toggleBoolean())
              newEnabled === false ? handleEnableDisableLink(false) : countEnabledLinks < 5 ? handleEnableDisableLink(true) : handleEnableAlert()
            }} />
        </div>
      </div>
    );
  } else {
    return (
      <EditLinkComponent
        id={id}
        title={title}
        url={url}
        handleSetEditing={handleSetEditing}
        handleUpdateLink={handleUpdateLink}
      />
    );
  }
}
