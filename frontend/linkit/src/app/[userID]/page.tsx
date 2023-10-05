import { Metadata } from "next";
import { getUser } from "../actions/profileForm";
import { clerkClient } from "@clerk/nextjs";
import UserNull from "@/components/UserDoesNotExist";

import Notespace from "@/components/notespace";

interface PageProps {
  params: {
    userID: string;
  };
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.userID}'s notespace`,
  };
}
const Page = async ({ params }: PageProps) => {
  // TODO: if !user --> should go to error page already....
  const user = await getUser(params.userID);
  if (!user) return <UserNull user={params.userID} />;

  // TODO: if null, use a default? most likely server problem
  const clerkUser = await clerkClient.users.getUser(user.clerkId);
  const profilepic = clerkUser?.imageUrl;

  // this page receives the slug
  // fetch user data from db and create the link tree
  return <Notespace user={user} profileImage={profilepic} params={params} />;
};
export default Page;
