"use client";
import React from "react";
import Input from "./Input";
import Button from "./Button";
import { signupAction } from "@/utils/actions";
import { useFormState } from "react-dom";
import ErrorMessage from "../ErrorMessages";

const Signup: React.FC = () => {
  const [state, formAction] = useFormState(signupAction, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-transparent shadow-lg shadow-gray-500 rounded-lg p-5 max-w-md w-full  ">
        <h2 className="text-2xl font-bold mb-6 text-white">Signup</h2>
        <form action={formAction}>
          <Input
            type="text"
            label="First Name"
            id="FName"
            defaultValue=""
            required
            placeholder="Your First Name"
            name="firstName"
          />
          <Input
            type="text"
            label="Last Name"
            id="LName"
            required
            placeholder="Your Last Name"
            defaultValue=""
            name="lastName"
          />
          <Input
            type="text"
            label="Role Postion"
            id="role"
            required
            placeholder="Role"
            defaultValue=""
            name="role"
          />

          <Input
            type="email"
            label="Email"
            id="email"
            required
            placeholder="Your Email Adress"
            defaultValue=""
            name="email"
          />
          <Input
            type="password"
            label="Password"
            id="password"
            required
            placeholder="Your Password"
            defaultValue=""
            name="password"
          />
          <Input
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Repeat Your Password"
            required
            defaultValue=""
            name="confirmPassword"
          />
          <Button name="Signup" LoadingName="Creating..." />
          {state?.error && <ErrorMessage errors={state.error} />}
        </form>
      </div>
    </div>
  );
};

export default Signup;
