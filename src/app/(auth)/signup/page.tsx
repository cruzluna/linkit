import { SignUp } from "@clerk/nextjs";
export default function CreateAccount() {
  return <SignUp path={"/signup"} signInUrl={"/login"} />;
}
