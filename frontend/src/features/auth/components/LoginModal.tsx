/* eslint-disable @typescript-eslint/return-await */
import { Form, Formik } from "formik";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineFacebook } from "react-icons/md";
import * as yup from "yup";

import { Button } from "@/components/Elements/Button";
import TextField from "@/components/Form/TextField";
import { useStore } from "@/stores";

import bgImage from "../assets/bg-login-modal.jpg";

import type { LoginDTO } from "../api/login";

export function LoginModal() {
  const {
    authStore: { isLogging, login },
    modalStore: { closeModal },
  } = useStore();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Invalid email address"),
    password: yup.string().required("Inform your password"),
  });

  const handleLogin = async (loginDto: LoginDTO) => {
    await login(loginDto);
    closeModal();
  };

  return (
    <div className="flex justify-center items-stretch bg-white w-screen h-screen rounded-sm lg:w-[100rem] lg:h-[45rem]">
      <div
        className="relative h-full w-1/2 hidden items-center bg-cover bg-no-repeat text-white md:flex"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

        <div className="w-full px-24 z-20">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Keep it special
          </h1>
          <p className="text-3xl text-left my-4">
            Capture your personal memory in unique way, anywhere.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 left-0 p-4 space-x-4 flex justify-center z-20">
          <Button icon={MdOutlineFacebook} size="xs" variant="basic-white" />
          <Button icon={AiOutlineTwitter} size="xs" variant="basic-white" />
          <Button icon={AiOutlineInstagram} size="xs" variant="basic-white" />
          <Button icon={IoLogoLinkedin} size="xs" variant="basic-white" />
        </div>
      </div>

      <div className="relative w-full flex justify-center items-center h-full bg-white">
        <div
          className="absolute z-10 inset-0 w-full block items-center bg-cover bg-no-repeat text-white lg:hidden"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 z-20" />
        </div>
        <div className="z-30 px-10 lg:px-0">
          <h2 className="my-6 text-7xl font-semibold text-white lg:text-eerie-black mb-20 lg:mb-8">
            Mini-Project
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async ({ email, password }) =>
              await handleLogin({ email, password })
            }
          >
            {({ isValid, dirty }) => (
              <Form className="w-full">
                <TextField
                  name="email"
                  placeholder="Email"
                  size="lg"
                  className="w-[40rem] mb-6 lg:mb-4"
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  size="lg"
                  className="w-[40rem] mb-4"
                />
                <div className="mb-4 text-right text-xl lg:text-lg text-white lg:text-gray-400 hover:underline hover:text-onyx transition-colors ease-in">
                  <a href="/">Forgot your password?</a>
                </div>
                <Button
                  className="rounded-full uppercase w-60 mx-auto"
                  content="Login"
                  size="xl"
                  type="submit"
                  disabled={!isValid || !dirty}
                  loading={isLogging}
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="absolute bottom-0 right-0 left-0 p-4 space-x-4 flex justify-center z-20 lg:hidden">
          <Button icon={MdOutlineFacebook} size="xs" variant="basic-white" />
          <Button icon={AiOutlineTwitter} size="xs" variant="basic-white" />
          <Button icon={AiOutlineInstagram} size="xs" variant="basic-white" />
          <Button icon={IoLogoLinkedin} size="xs" variant="basic-white" />
        </div>
      </div>
    </div>
  );
}
