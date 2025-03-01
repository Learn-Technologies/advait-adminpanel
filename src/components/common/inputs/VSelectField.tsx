import React from "react";
import { useFormContext } from "react-hook-form";
import VErrorHandler from "../formHelper/VErrorHandler";
type IProps = {
  name: string;
  label: string;
  labelValue: string;
  optionsValue: {
    data: [];
    valueAccess: string;
  };
  otherProps?: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
};
export default function VSelectField(props: IProps) {
  const iterateValue = props.optionsValue.valueAccess;
  const objForm = useFormContext();
  return (
    <div>
      <select {...objForm.register(props.name)} {...props.otherProps}>
        <option value={props.labelValue} defaultValue={"Select"}>
          Selects: {props.label}
        </option>
        {props.optionsValue.data &&
          props.optionsValue.data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <option
                value={item[iterateValue]}
                className="text-gray-600 w-full focus:border-secondary"
              >
                {item[iterateValue]}
              </option>
            </React.Fragment>
          ))}
      </select>

      <VErrorHandler errors={objForm.formState.errors} name={props.name} />
    </div>
  );
}
