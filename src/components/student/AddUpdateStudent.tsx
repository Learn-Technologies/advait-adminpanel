import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import * as yup from "yup";
import VSelectField from "../common/inputs/VSelectField";
import VTextField from "../common/inputs/VTextField";
import Loading from "../common/Loading";
import VLoadingButton from "../common/VLoadingButton";
import VUtils from "../common/VUtils";
import { addStudInp } from "../enums/inputs";
import { useClassList } from "../services/firebase/apis/class/QClass";
import { useAddUpdateStudList } from "../services/firebase/apis/std/QStudent";
import { IAddStudInp } from "../common/type/type";

type IProps = {
  refechList?: Function;
  isObjItem?: Object | null;
  setObjItem?: (isObjItem: Object | null) => void;
};

const schema = yup.object().shape({
  studName: yup.string().required("Full name is required"),
  pursuingClass: yup.string().required("Pursuing class is required"),
  fatherName: yup.string(),
  contact: yup.string().max(10, "Contact number should be less than 10 digit"),
  // .min(10, "Contact number atleast 10 digit"),
  motherName: yup.string(),
  address: yup.string(),
});
export default function AddUpdateStudent(props: IProps) {
  const addUpdteStudList = useAddUpdateStudList();
  const classList = useClassList();
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: props.isObjItem && props.isObjItem,
  });
  async function onSubmit(data: any) {
    console.log(data, "data");
    await addUpdteStudList.mutateAsync({ ...data, createdAt: Date.now() });
     props.setObjItem && props.setObjItem(null);
    props.refechList && (await props.refechList());
    await handleToastAlert(data);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id) return await VUtils.toastAlert("Student Updated Successfully");
    return await VUtils.toastAlert("Student Added Successfully");
  }
  if (classList.isLoading) return <Loading />;
  const pursuingOptns =
    classList.data &&
    classList.data.map((item: any) => ({ title: item.className }));
  function handleInput(item: IAddStudInp, index: number) {
    if (index === 1)
      return (
        <div>
          <p className="text-base font-semibold text-primary">Pursuing Class</p>
          <VSelectField
            label="Pursuing Class"
            labelValue=""
            name="pursuingClass"
            optionsValue={{
              data: pursuingOptns,
              valueAccess: "title",
            }}
            otherProps={{
              className:
                "w-full h-12 border-2 rounded-md focus:border-secondary",
            }}
          />
        </div>
      );
    return (
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
    );
  }
  return (
    <div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <div
            className={`w-full mx-auto lgl:w-[450px] items-center grid sm:grid-cols-2 gap-3`}
          >
            {addStudInp.map((item: IAddStudInp, index: number) => (
              <React.Fragment key={index}>
                {handleInput(item, index)}
              </React.Fragment>
            ))}
          </div>

          <VLoadingButton
            type="submit"
            variant="contained"
            className="rounded-lg text-white mt-5"
            isLoading={addUpdteStudList.isLoading}
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
