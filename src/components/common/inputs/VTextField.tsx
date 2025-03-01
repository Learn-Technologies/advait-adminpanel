import React from "react";
import { useFormContext } from "react-hook-form";
import VErrorHandler from "../formHelper/VErrorHandler";

type IInput = {
  name: string;
  type?: string;
  className?: string;
  ComponentProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};
export default function VTextField(props: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        {...register(props?.name)}
        className={`w-[100%] focus:border-secondary focus:outline-none p-3 text-lg h-12  rounded-md border-2 ${props.className}`}
        {...props?.ComponentProps}
      />
      <VErrorHandler errors={errors} name={props.name} />
    </div>
  );
}
