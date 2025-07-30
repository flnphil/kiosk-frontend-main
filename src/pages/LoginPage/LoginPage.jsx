import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex md:flex-row flex-col-reverse bg-white min-h-[100vh] overflow-hidden h-full">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
