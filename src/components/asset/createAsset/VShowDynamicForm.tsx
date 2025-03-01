import { DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import VUtils from "../../common/VUtils";
import VTextField from "../../common/inputs/VTextField";
import VLoadingButton from "../../common/VLoadingButton";
import { MdSaveAs } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

type IProps = {
  item: any;
};
export default function VShowDynamicForm(props: IProps) {
  const { item } = props;
  console.log(item.components[0].key);
  //   console.log(item, "item VShowDynamicForm");
  const inpIdentyfyngKeys = [
    "key",
    "label",
    "type",
    "maxLength",
    "minLength",
    "required",
  ];
  // key to get={
  // key  is used for name because its unique
  // label
  // type datatype strig
  // validamaxLength datatype number
  // minLength datatype number
  // required  datatype boolean
  // }
  const getAccurateData: any = item.components.map((asd: any) => {
    if (asd.type === "button") return;
    return {
      key: asd.key,
      placeholder: asd.placeholder,
      label: asd.label,
      type: asd.type,
      maxLength: asd.validate.maxLength,
      minLength: asd.validate.minLength,
      required: asd.validate.required,
    };
  });
  console.log(getAccurateData, "getAccurateData");
  const createSchema = (data: any, keys: any) => {
    const shape: any = {};
    data.forEach((item: any) => {
      if (!item) return;
      const mxLen = item[inpIdentyfyngKeys[3]];
      const minLen = item[inpIdentyfyngKeys[4]];
      switch (item) {
        case mxLen && minLen:
          shape[item.key] = yup
            .string()
            .max(mxLen, `${item.key} should be less than ${mxLen} characters`)
            .min(
              minLen,
              `${item.key} should be greater than ${minLen} characters`
            );
          break;
        case minLen:
          shape[item.key] = yup
            .string()
            .min(
              minLen,
              `${item.key} should be greater than ${minLen} characters`
            );
          break;
        case mxLen:
          shape[item.key] = yup
            .string()
            .max(mxLen, `${item.key} should be less than ${mxLen} characters`);
          break;
        default:
          shape[item.key] = yup.string();
          break;
      }
    });
    return yup.object().shape(shape);
  };

  const schema = createSchema(getAccurateData, inpIdentyfyngKeys);

  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    // defaultValues: props.isObjItem && props.isObjItem,
  });
  async function onSubmit(data: any) {
    console.log(data, "handleData");
    // await addUpdteClassList.mutateAsync({ ...data, createdAt: Date.now() });
    // props.setObjItem && props.setObjItem(null);
    // props.refechList && (await props.refechList());
    // await handleToastAlert(data);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id) return await VUtils.toastAlert("Class Updated Successfully");
    return await VUtils.toastAlert("Class Added Successfully");
  }
  return (
    <div>
      <DialogHeader>
        <div className="flex justify-between w-full">
          <p>Add Asset {item.assetCollection} </p>
          <div className="flex">
            <IconButton variant="text" color="blue-gray" onClick={() => {}}>
              <AiFillCloseCircle className="text-xl" />
            </IconButton>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex mx-auto justify-center ">
        <div>
          <FormProvider {...objForm}>
            <form onSubmit={objForm.handleSubmit(onSubmit)}>
              {/* <div
            className={`w-full mx-auto lgl:w-[450px] items-center grid sm:grid-cols-2 gap-3`}
          > */}
              {getAccurateData &&
                getAccurateData.map((item: any, index: number) => {
                  if (!item) return;
                  return (
                    <React.Fragment key={index}>
                      <div className="flex flex-col">
                        <p className="font-titleFont text-base font-semibold text-primary">
                          {item.label}
                        </p>
                        <VTextField
                          name={item.key}
                          ComponentProps={{
                            placeholder: item.placeholder,
                            type: item.type,
                          }}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              {/* </div> */}

              <VLoadingButton
                type="submit"
                variant="contained"
                className="rounded-lg text-white mt-5"
                // isLoading={addUpdteClassList.isLoading}
                // leftIcon={
                //   props.isObjItem ? (
                //     <MdSaveAs className="mr-2 h-5 w-5" />
                //   ) : (
                //     <IoIosSave className="mr-2 h-5 w-5" />
                //   )
                // }
              >
                add
                {/* {props.isObjItem ? "Update" : "Add"} */}
              </VLoadingButton>
            </form>
          </FormProvider>
        </div>
      </DialogBody>
    </div>
  );
}
