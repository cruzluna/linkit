import { Chip } from "@material-tailwind/react";
import { UseFieldArrayRemove } from "react-hook-form";
interface tagProps {
  tagsToShow: string[];
  removeTag: UseFieldArrayRemove;
}

export const TagComponent = ({ tagsToShow, removeTag }: tagProps) => {
  // object type
  if (!tagsToShow) {
    return null;
  }

  return tagsToShow.map((tag: string, index: number) => {
    return (
      <Chip
        key={index}
        open={true}
        onClose={() => removeTag(index)}
        className="bg-noto-purple font-light text-base"
        value={tag}
      />
    );
  });
};
