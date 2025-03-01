import { DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import VModal from "../common/modal/VModal";

type IProps = {
  itemState: {
    isObjItem: Object | null;
    setObjItem: (isObjItem: Object | null) => void;
  };
  modal: {
    isMOdalOpen: boolean;
    setMOdalOpen: (isMOdalOpen: boolean) => void;
    isModalScroll?: boolean;
  };
  childCompoent: React.JSX.Element;
  title: string;
  refechList: Function;
};
export default function VDataListModal(props: IProps) {
  const { isMOdalOpen, setMOdalOpen, isModalScroll } = props.modal;
  const { isObjItem, setObjItem } = props.itemState;
  const refechList = () => props.refechList();
  return (
    <VModal
      openModal={isMOdalOpen}
      setOpenModal={() => {
        setObjItem(null);
        setMOdalOpen(false);
      }}
      modalSize="xl"
      isScrollableModal={isModalScroll}
      component={
        <>
          <DialogHeader>
            <div className="flex justify-between w-full">
              <p>{(isObjItem ? "Update" : "Add") + " " + props.title}</p>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => {
                  setObjItem(null);
                  setMOdalOpen(false);
                }}
              >
                <AiFillCloseCircle className="text-xl" />
              </IconButton>
            </div>
          </DialogHeader>
          <DialogBody className="w-full">
            {React.cloneElement(props.childCompoent, {
              refechList,
              ...props.itemState,
            })}
          </DialogBody>
        </>
      }
    />
  );
}
