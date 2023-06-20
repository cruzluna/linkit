import { Metadata } from "next";
import UserContainer from "@/app/components/userContainer";
import UserAvatar from "@/app/components/userAvatar";
import UserLink from "@/app/components/userLinks";

interface PageProps {
  params: {
    userID: string;
  };
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `${params.userID} linkit`,
  };
}
const page = async ({ params }: PageProps) => {
  // this page receives the slug
  // fetch user data from db and create the link tree
  return (
    <>
      <UserContainer>
        <UserAvatar />
        {params.userID}
        <UserLink />
      </UserContainer>
    </>
  );
};
export default page;
