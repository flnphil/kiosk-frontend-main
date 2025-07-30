import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <div className="relative flex md:flex-row flex-col-reverse bg-white min-h-[100vh] overflow-hidden h-full">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
