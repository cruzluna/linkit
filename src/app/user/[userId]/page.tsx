import { Metadata } from "next";

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
     
        {params.userID}
       
    </>
  );
};
export default page;
