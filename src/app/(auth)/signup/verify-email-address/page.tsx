import { SignUp } from "@clerk/nextjs";
export default function CreateAccount() {
  return (
    <div className="flex items-center justify-center">
      <SignUp path={"/signup"} signInUrl={"/login"} />
    </div>
  );
}
