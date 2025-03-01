import React from "react";
import Loading from "../common/Loading";
import VUtils from "../common/VUtils";
import VDataList from "../dataLIst/VDataList";
import { FaRegEye } from "react-icons/fa";
import VModal from "../common/modal/VModal";
import {
  useClassList,
  useDeleteClassList,
} from "../services/firebase/apis/class/QClass";
import AddUpdateClass from "./AddUpdateClass";
export default function ClassPage() {
  const classList = useClassList();
  const delClassList = useDeleteClassList();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  if (classList.isLoading) return <Loading />;
  if (classList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delClassList.mutateAsync(data);
    await classList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }
  return (
    <div>
      <VDataList
        title="Class"
        displayColName={{ title: "Class Name", key: "className" }}
        modal={{
          isMOdalOpen: isMOdalOpen,
          setMOdalOpen: setMOdalOpen,
          isModalScroll: true,
        }}
        actions={{
          onEdit: (item: any) => {
            setObjBrand(item);
            setMOdalOpen(true);
          },
          onDelete: (item: any) => onDeleteList(item),
        }}
        itemState={{
          isObjItem: isObjBrand,
          setObjItem: setObjBrand,
        }}
        data={classList}
        childCompoent={<AddUpdateClass />}
        // DisplayContact
      />
      <VModal
        modalSize="xxl"
        openModal={isHandleViewPage}
        setOpenModal={setHandleViewPage}
        isScrollableModal={true}
        component={
          //   <HandleViewPage
          //     item={isHandleViewPage}
          //     setOpenModal={setHandleViewPage}
          //   />
          <>visible </>
        }
      />
    </div>
  );
}
