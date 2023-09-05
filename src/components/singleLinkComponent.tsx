// "use client"; // remove from child https://github.com/vercel/next.js/discussions/46795#discussioncomment-5248407
import { deleteLink } from "@/app/actions/linksActions";
import { LinkStatProps } from "@/interfaces/linkStatsProps";
import {
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
  const handleSetEditing = () => {
    setEditing(false);
  };

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  if (!editing) {
    return (
      <div className="bg-[#1C202F] text-white px-3 py-3 rounded w-full md:w-1/3 mx-auto mt-5">
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
        <div className="font-bold text-xl md:text-lg">{title}</div>

        <div className="font-medium text-base md:text-sm">{url}</div>
        <div className="font-medium flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0 md:mr-2 text-sm">{"-"}</div>
          <Switch
            id={id}
            color="green"
            defaultChecked={initialEnabled}
            disabled
          />
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
