import React from "react";
import { useFormContext } from "react-hook-form";
import VErrorHandler from "../formHelper/VErrorHandler";
import { Checkbox } from "@material-tailwind/react";

type IInput = {
  name: string;
  type?: string;
  className?: string;
  ComponentProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};
export default function VCheckBox(props: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Checkbox {...register(props?.name)} label={props?.name} color="indigo" />
      <VErrorHandler errors={errors} name={props.name} />
    </div>
  );
}
