import { useRouter } from "next/router";
import React from "react";
import Loading from "../common/Loading";
import VModal from "../common/modal/VModal";
import VUtils from "../common/VUtils";
import VDataList from "../dataLIst/VDataList";
import { useStudList } from "../services/firebase/apis/std/QStudent";
import {
  useDeleteStudAttend,
  useStudAttendList,
} from "../services/firebase/apis/std/QTakeStdAttendance";
import AddUpdateStudAttendance from "./AddUpdateStudAttendance";
export default function TakeStudentAttendance() {
  const router = useRouter();
  const getClass = router.asPath.split("?")[1]?.toLocaleLowerCase();
  console.log(getClass, "getClass");
  const studList = useStudList();
  const studAttendList = useStudAttendList();
  const delstudAttendList = useDeleteStudAttend();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  React.useEffect(() => {
    if (!getClass) {
      router.push("studentAttendance");
    }
  }, [getClass]);
  if (studAttendList.isLoading || studList.isLoading) return <Loading />;
  if (studAttendList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delstudAttendList.mutateAsync(data);
    await studAttendList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }
  const getStdByClass =
    studList.data &&
    studList.data.length > 0 &&
    studList.data.filter(
      (item: any) => item.pursuingClass?.toLocaleLowerCase() === getClass
    );

  const fltrStudAttendListByClass =
    studAttendList.data &&
    studAttendList.data.length > 0 &&
    studAttendList.data.filter(
      (item: any) => item.pursuingClass?.toLocaleLowerCase() === getClass
    );
  console.log(getStdByClass, "getStdByClass");
  console.log(studAttendList.data, "studAttendList.data");
  return (
    <div>
      <VDataList
        title={`Attendance ${getClass}`}
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
        data={{
          data: fltrStudAttendListByClass,
          refetch: () => studAttendList.refetch(),
        }}
        childCompoent={
          <AddUpdateStudAttendance getStdByClass={getStdByClass} />
        }
        error={{
          statement: getStdByClass.length === 0,
          exMsg: `Student not found of the class ${getClass}`,
        }}
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
