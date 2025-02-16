import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@chandra_sekhar99/medium-common-v1";
import { useState } from "react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't Have an account?"
                : "Already Have an account? "}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <LabelledInput
              label="Name"
              placeholder="John Doe.."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Email"
              placeholder="JohnDoe@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="Type your secret"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="button"
            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "Signup" : "Signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  type,
  label,
  placeholder,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black pt-2">
          {label}
        </label>
        <input
          type={type || "text"}
          className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          onChange={onChange}
        />
      </div>
    </div>
  );
}
