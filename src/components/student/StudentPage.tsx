import React from "react";
import Loading from "../common/Loading";
import VUtils from "../common/VUtils";
import VDataList from "../dataLIst/VDataList";
import { FaRegEye } from "react-icons/fa";
import VModal from "../common/modal/VModal";
import {
  useDeleteStudList,
  useStudList,
} from "../services/firebase/apis/std/QStudent";
import AddUpdateStudent from "./AddUpdateStudent";
export default function StudentPage() {
  const studList = useStudList();
  const delStudList = useDeleteStudList();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  if (studList.isLoading) return <Loading />;
  if (studList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delStudList.mutateAsync(data);
    await studList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }
  return (
    <div>
      <VDataList
        title="Student"
        displayColName={{ title: "Student Name", key: "studName" }}
        colsKey={[{ title: "Pursuing Class", key: "pursuingClass" }]}
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
          //   otherActions: {
          //     handleAction: (item: any) => {
          //       return setHandleViewPage(item);
          //     },
          //     iconName: "Handle Something",
          //     icon: <FaRegEye className="text-xl text-blue-500 select-none" />,
          //   },
        }}
        itemState={{
          isObjItem: isObjBrand,
          setObjItem: setObjBrand,
        }}
        data={studList}
        childCompoent={<AddUpdateStudent />}
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
