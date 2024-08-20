import LoginForm from "@/components/FormComp/LoginForm";
import SigninWithGoogle from "@/components/FormComp/SigninWithGoogle";
import React from "react";

export const metadata = {
  title: "Task Flow | Login",
};
function page() {
  return (
    <>
      <div className="flex flex-col gap-10 mt-10 items-center mb-5 ">
        <SigninWithGoogle />
      </div>
      <div className="flex items-center justify-center mt-10 ">
        <LoginForm />
      </div>
    </>
  );
}

export default page;
