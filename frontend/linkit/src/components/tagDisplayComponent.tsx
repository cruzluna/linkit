import { deleteTag } from "@/app/actions/tagActions";
import { Chip } from "@material-tailwind/react";
// import { UseFieldArrayRemove } from "react-hook-form";
import { AiOutlineTag } from "react-icons/ai";
interface tagProps {
  id: string;
  skill: string;
  handleAddTag?: () => void;
  handleDeleteTag: (id: string) => void;
  handleUpdateTag?: () => void; // TODO: create a form comp.
}

export const TagComponent = ({ id, skill, handleDeleteTag }: tagProps) => {
  return (
    <Chip
      key={id}
      icon={<AiOutlineTag className="fill-white truncate" />}
      open={true}
      onClose={() => {
        deleteTag(id);
        handleDeleteTag(id);
      }}
      className="flex flex-col-1 w-3/4 bg-noto-purple font-light text-base mb-2 truncate"
      value={skill}
    />
  );
};
