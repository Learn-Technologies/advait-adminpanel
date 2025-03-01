import React from "react";
import Loading from "../common/Loading";
import VModal from "../common/modal/VModal";
import VUtils from "../common/VUtils";
import VDataList from "../dataLIst/VDataList";
import {
  useDeleteLectList,
  useLectList,
} from "../services/firebase/apis/lecturer/QLecturer";
import AddUpdateLecturer from "./AddUpdateLecturer";
export default function CreateLecturerPage() {
  const lecList = useLectList();
  const delLectList = useDeleteLectList();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  if (lecList.isLoading) return <Loading />;
  if (lecList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delLectList.mutateAsync(data);
    await lecList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }
  return (
    <div>
      <VDataList
        title="Lecturer"
        displayColName={{ title: "Name", key: "lectName" }}
        colsKey={[
          { title: "Graduation", key: "graduation" },
          { title: "Post Graduation", key: "postGraduation" },
        ]}
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
        data={lecList}
        childCompoent={<AddUpdateLecturer />}
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
