// by default use server
import ProfilePageComponent from "../../components/profileComponent";

export default async function Page() {
  // TODO: disable if user already has a profile?
  return (
    <>
      <ProfilePageComponent />
    </>
  );
}
