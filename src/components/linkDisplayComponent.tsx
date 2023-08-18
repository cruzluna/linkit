import { Chip } from "@material-tailwind/react";
import { UseFieldArrayRemove } from "react-hook-form";
import { AiOutlineLink } from "react-icons/ai";

interface linkProps {
  linksToShow: string[];
  removeLink: UseFieldArrayRemove;
}

export const LinkComponent = ({ linksToShow, removeLink }: linkProps) => {
  if (!linksToShow) {
    return null;
  }

  return linksToShow.map((link: string, index: number) => {
    return (
      <>
        <Chip
          key={index}
          icon={<AiOutlineLink className="fill-white" />}
          open={true}
          onClose={() => removeLink(index)}
          className="bg-noto-purple m-2 lowercase font-light text-base"
          value={link}
        />
      </>
    );
  });
};
