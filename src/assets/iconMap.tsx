import { IconType } from "react-icons";
import { VscGithubInverted } from "react-icons/vsc";
import { AiOutlineCode, AiOutlineLink } from "react-icons/ai";

const icons: Record<string, IconType> = {
  github: VscGithubInverted,
  commandline: AiOutlineCode,
  default: AiOutlineLink,
};

/// helper function to get icons. Default for now is commandline icon
const getIcon = (key: string): IconType => {
  return icons[key] || icons["default"];
};

interface IconComponentProps {
  iconKey: string;
  className?: string;
  size?: string;
}
/// Reusable icon component. Icon key is required
export const IconComponent: React.FC<IconComponentProps> = ({
  iconKey,
  className,
  size,
}) => {
  const Icon = getIcon(iconKey);

  return <Icon className={className} size={size} />;
};
