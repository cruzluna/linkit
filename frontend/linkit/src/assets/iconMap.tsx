import { IconType } from "react-icons";
import { VscGithubInverted } from "react-icons/vsc";
import {
  AiFillCloud,
  AiOutlineCode,
  AiOutlineLink,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { FaPython, FaTools, FaRust, FaAws } from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiAdobephotoshop,
  SiOcaml,
  SiVim,
  SiNeovim,
  SiLeetcode,
} from "react-icons/si";
import { BiLogoGoLang, BiLogoNodejs } from "react-icons/bi";
import { TbBrandVscode } from "react-icons/tb";

const icons: Record<string, IconType> = {
  linkedin: AiFillLinkedin,
  x: AiFillTwitterCircle,
  twitter: AiFillTwitterCircle,
  leetcode: SiLeetcode,
  github: VscGithubInverted,
  "github.com": VscGithubInverted,
  commandline: AiOutlineCode,
  Python: FaPython,
  Golang: BiLogoGoLang,
  "C++": SiCplusplus,
  AWS: FaAws,
  "Google Cloud": AiFillCloud,
  Typescript: SiTypescript,
  "node.js": BiLogoNodejs,
  Rust: FaRust,
  OCaml: SiOcaml,
  Photoshop: SiAdobephotoshop,
  Vim: SiVim,
  neoVim: SiNeovim,
  VsCode: TbBrandVscode,
  default: AiOutlineLink,
};

const toolIcons: Record<string, IconType> = {
  Python: FaPython,
  Golang: BiLogoGoLang,
  "C++": SiCplusplus,
  AWS: FaAws,
  "Google Cloud": AiFillCloud,
  Typescript: SiTypescript,
  "node.js": BiLogoNodejs,
  Rust: FaRust,
  OCaml: SiOcaml,
  Photoshop: SiAdobephotoshop,
  Vim: SiVim,
  neoVim: SiNeovim,
  VsCode: TbBrandVscode,
  default: FaTools,
};

/// helper function to get icons. Default for now is commandline icon
const getIcon = (key: string): IconType => {
  return icons[key] || icons["default"];
};

/// helper function to parse iconName properly.
// removes https, removes www, and removes everything after first dot
export const getIconName = (url: string): string => {
  return url.replace(/.+\/\/|www.|\..+/g, "");
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
