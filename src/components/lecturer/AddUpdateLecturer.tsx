import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import * as yup from "yup";
import VTextField from "../common/inputs/VTextField";
import VLoadingButton from "../common/VLoadingButton";
import VUtils from "../common/VUtils";
import { addLectInp, classInp } from "../enums/inputs";
import { useAddUpdateClassList } from "../services/firebase/apis/class/QClass";
import { useAddUpdateLectList } from "../services/firebase/apis/lecturer/QLecturer";

type IProps = {
  refechList?: Function;
  isObjItem?: Object | null;
  setObjItem?: (isObjItem: Object | null) => void;
};

const schema = yup.object().shape({
  lectName: yup.string().required("Lecturer name is required"),
  age: yup.string().required("Lecturer Age is required"),
  email: yup.string().email().required("Lecturer Email is required"),
  contact: yup
    .string()
    .max(10, "Contact number should be less than 10 digit")
    .min(10, "Contact number atleast 10 digit")
    .required("Lecturer Number is required"),
  alternateNo: yup.string(),
  graduation: yup.string(),
  postGraduation: yup.string(),
  address: yup.string(),
});
export default function AddUpdateLecturer(props: IProps) {
  const addUpdteLectList = useAddUpdateLectList();
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: props.isObjItem && props.isObjItem,
  });
  async function onSubmit(data: any) {
    await addUpdteLectList.mutateAsync({ ...data, createdAt: Date.now() });
    props.setObjItem && props.setObjItem(null);
    props.refechList && (await props.refechList());
    await handleToastAlert(data);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id) return await VUtils.toastAlert("Class Updated Successfully");
    return await VUtils.toastAlert("Class Added Successfully");
  }
  return (
    <div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          {/* <div
            className={`w-full mx-auto lgl:w-[450px] items-center grid sm:grid-cols-2 gap-3`}
          > */}
          {addLectInp.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <div className="flex flex-col">
                <p className="font-titleFont text-base font-semibold text-primary">
                  {item.title}
                </p>
                <VTextField
                  name={item.name}
                  ComponentProps={{
                    placeholder: item.title,
                    type: item.type,
                  }}
                />
              </div>
            </React.Fragment>
          ))}
          {/* </div> */}

          <VLoadingButton
            type="submit"
            variant="contained"
            className="rounded-lg text-white mt-5"
            isLoading={addUpdteLectList.isLoading}
            leftIcon={
              props.isObjItem ? (
                <MdSaveAs className="mr-2 h-5 w-5" />
              ) : (
                <IoIosSave className="mr-2 h-5 w-5" />
              )
            }
          >
            {props.isObjItem ? "Update" : "Add"}
          </VLoadingButton>
        </form>
      </FormProvider>
    </div>
  );
}
