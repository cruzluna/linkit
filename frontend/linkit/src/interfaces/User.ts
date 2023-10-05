export interface User {
  name: string;
  headline: string;
  clerkId: string;
  links: {
    id: string;
    title: string;
    iconName: string;
    url: string;
    enabled: boolean;
  }[];
  tags: { id: string; skill: string }[];
  tools: { iconName: string; toolItem: string }[];
}