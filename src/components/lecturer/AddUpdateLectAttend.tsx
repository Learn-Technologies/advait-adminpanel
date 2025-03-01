import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import * as yup from "yup";
import VCheckBox from "../common/inputs/VCheckBox";
import VLoadingButton from "../common/VLoadingButton";
import VUtils from "../common/VUtils";
import { useAddUpdateLectAttend } from "../services/firebase/apis/lecturer/QTakeLecturerAttend";

type IProps = {
  refechList?: Function;
  isObjItem?: Object | null;
  setObjItem?: (isObjItem: Object | null) => void;
  lectList: any;
};

const schema = yup.object().shape({
  mudit: yup.boolean(),
});
export default function AddUpdateLectAttend(props: IProps) {
  const { lectList } = props;
  const addUpdteLectAtndList = useAddUpdateLectAttend();
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: props.isObjItem && props.isObjItem,
  });
  console.log(props.isObjItem, "props.isObjItem");
  async function onSubmit(data: any) {
    await addUpdteLectAtndList.mutateAsync({
      ...data,
      createdAt: Date.now(),
    });
    props.setObjItem && props.setObjItem(null);
    props.refechList && (await props.refechList());
    await handleToastAlert(data);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id)
      return await VUtils.toastAlert(
        "Lecturer Attendance Updated Successfully"
      );
    return await VUtils.toastAlert("Lecturer Attendance Created Successfully");
  }
  if (lectList.data.length === 0) return <p>No Lecturer Found...</p>;
  return (
    <div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <div
            className={` mx-auto lgl:w-[450px] items-center grid sm:grid-cols-4 gap-3`}
          >
            {lectList.data &&
              lectList.data.length > 0 &&
              lectList.data.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col">
                    <VCheckBox name={item.lectName} />
                  </div>
                </React.Fragment>
              ))}
          </div>

          <VLoadingButton
            type="submit"
            variant="contained"
            className="rounded-lg text-white mt-5"
            isLoading={addUpdteLectAtndList.isLoading}
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
