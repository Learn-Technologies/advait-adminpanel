import { DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import VModal from "../../common/modal/VModal";
import VDataListNavbar from "../../dataLIst/VDataListNavbar";
import { dataListstore } from "../../pullState/dataListStore";
import VShowDynamicForm from "./VShowDynamicForm";
type IProps = {
  item?: any;
  // setOpenModal: Function;
};
export default function CreateSubAssets(props: IProps) {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const isSearchOn = dataListstore.useState((s) => s.isDataListSearchOn);
  console.log(props.item, "props.item");
  return (
    <div>
      <VDataListNavbar
        title={props.item.assetCollection}
        isSearchOn={isSearchOn}
        setMOdalOpen={setModalOpen}
        isDisabled={false}
      />

      <VModal
        modalSize="xl"
        openModal={isModalOpen}
        setOpenModal={setModalOpen}
        isScrollableModal={true}
        component={<VShowDynamicForm item={props.item} />}
      />
    </div>
  );
}
