import { SignUp } from "@clerk/nextjs";
export default function CreateAccount() {
  return (
    <SignUp
      path={"/signup"}
      routing={"path"}
      signInUrl={"/login"}
      redirectUrl={"/"}
    />
  );
}
