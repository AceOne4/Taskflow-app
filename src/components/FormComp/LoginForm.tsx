"use client";
import React from "react";
import Input from "./Input";
import Button from "./Button";
import { loginAction } from "@/utils/actions";
import { useFormState } from "react-dom";
import ErrorMessage from "../ErrorMessages";

const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="flex items-start justify-center min-h-screen ">
      <div className="bg-transparent shadow-lg shadow-gray-500 rounded-lg p-5 max-w-md w-full  ">
        <h2 className="text-2xl font-bold mb-6 text-white ">Login</h2>
        <form action={formAction}>
          <Input
            type="email"
            label="Email"
            id="email"
            defaultValue=""
            required
            placeholder="Email Adress"
            name="email"
          />
          <Input
            type="password"
            label="Password"
            id="password"
            defaultValue=""
            placeholder="Password"
            required
            name="password"
          />
          <Button name="Login" LoadingName="Logining..." />
          {state?.error && <ErrorMessage errors={state.error} />}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
