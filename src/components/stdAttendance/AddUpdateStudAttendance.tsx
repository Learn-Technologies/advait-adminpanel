import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import * as yup from "yup";
import VCheckBox from "../common/inputs/VCheckBox";
import VLoadingButton from "../common/VLoadingButton";
import VUtils from "../common/VUtils";
import { useAddUpdateStudAttend } from "../services/firebase/apis/std/QTakeStdAttendance";

type IProps = {
  refechList?: Function;
  isObjItem?: Object | null;
  setObjItem?: (isObjItem: Object | null) => void;
  getStdByClass: any;
};

const schema = yup.object().shape({
  mudit: yup.boolean(),
});
export default function AddUpdateStudAttendance(props: IProps) {
  const { getStdByClass } = props;
  const addUpdteStudAttendList = useAddUpdateStudAttend();
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: props.isObjItem && props.isObjItem,
  });
  async function onSubmit(data: any) {
    await addUpdteStudAttendList.mutateAsync({
      ...data,
      createdAt: Date.now(),
      pursuingClass: getStdByClass[0].pursuingClass,
    });
    props.setObjItem && props.setObjItem(null);
    props.refechList && (await props.refechList());
    await handleToastAlert(data);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id)
      return await VUtils.toastAlert("Student Attendance Updated Successfully");
    return await VUtils.toastAlert("Student Attendance Created Successfully");
  }

  return (
    <div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <div
            className={` mx-auto lgl:w-[450px] items-center grid sm:grid-cols-4 gap-3`}
          >
            {getStdByClass &&
              getStdByClass.length > 0 &&
              getStdByClass.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col">
                    <VCheckBox name={item.studName} />
                  </div>
                </React.Fragment>
              ))}
          </div>

          <VLoadingButton
            type="submit"
            variant="contained"
            className="rounded-lg text-white mt-5"
            isLoading={addUpdteStudAttendList.isLoading}
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
