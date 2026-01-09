import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn redirectUrl="/" />
    </div>
  );
};

export default SignInPage;
