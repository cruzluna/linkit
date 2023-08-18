import { Chip } from "@material-tailwind/react";
import { UseFieldArrayRemove } from "react-hook-form";
import { AiOutlineTag } from "react-icons/ai";
interface tagProps {
  tagsToShow: string[];
  removeTag: UseFieldArrayRemove;
}

export const TagComponent = ({ tagsToShow, removeTag }: tagProps) => {
  if (!tagsToShow) {
    return null;
  }

  return tagsToShow.map((tag: string, index: number) => {
    return (
      <Chip
        key={index}
        icon={<AiOutlineTag className="fill-white" />}
        open={true}
        onClose={() => removeTag(index)}
        className="bg-noto-purple font-light text-base"
        value={tag}
      />
    );
  });
};
