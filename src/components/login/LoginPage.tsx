import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Loading from "../common/Loading";
import VUtils from "../common/VUtils";
import VTextField from "../common/inputs/VTextField";
import { loginInputs } from "../services/staticData";

interface ILogin {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .typeError("E-mail must be a string")
      .email("Value must be a email")
      .required("E-mail must be required"),
    password: yup
      .string()
      .typeError("Password must be a string")
      .required("Password must be required"),
  })
  .required();

export default function LogInPage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const inputStyle =
    "block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400";
  const navigate = useRouter();
  const objForm = useForm<ILogin>({
    resolver: yupResolver(schema),
    // defaultValues: defaultCheckoutValues,
  });
  async function onSubmit(data: ILogin) {
    login(data);
  }
  async function login(data: ILogin) {
    console.log(data, "loginPage");
    await VUtils.cookieSet("token", data);
    navigate.push("/");
  }

  function errorMessage(msg: string) {
    switch (msg) {
      case "Firebase: Error (auth/user-not-found).":
        return VUtils.showAlert("User Not Found", "warning");
      case "Firebase: Error (auth/wrong-password).":
        return VUtils.showAlert("Wrong Password", "warning");
      default:
        return VUtils.showAlert(msg, "warning");
    }
  }

  if (loading) return <Loading />;
  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSubmit)}>
        <div className={`contain py-10`}>
          <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-6 text-gray-900 dark:text-white">
              Login
            </h2>
            <div className="space-y-2">
              {loginInputs.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div>
                    <label
                      htmlFor={item.name}
                      className="text-gray-600 mb-2 block"
                    >
                      {item.lblName}
                    </label>
                    <VTextField
                      name={item.name}
                      className={inputStyle}
                      ComponentProps={{
                        placeholder: item.placeholder,
                        type: item.type,
                      }}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>

            {/* <p className="mt-4 text-center text-gray-600">
                  Don&apos;t have account?{" "}
                  <Link href="/register" className="text-primary">
                    Register
                  </Link>
                </p> */}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
