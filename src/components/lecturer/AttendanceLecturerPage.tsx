import React from "react";
import Loading from "../common/Loading";
import VUtils from "../common/VUtils";
import VDataList from "../dataLIst/VDataList";
import { useLectList } from "../services/firebase/apis/lecturer/QLecturer";
import {
  useDeleteSLectAttend,
  useLectAttendList,
} from "../services/firebase/apis/lecturer/QTakeLecturerAttend";
import AddUpdateLectAttend from "./AddUpdateLectAttend";
export default function AttendanceLecturerPage() {
  const lectList = useLectList();
  const LectAttendList = useLectAttendList();
  const delLectAttendList = useDeleteSLectAttend();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);

  if (LectAttendList.isLoading || lectList.isLoading) return <Loading />;
  if (LectAttendList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delLectAttendList.mutateAsync(data);
    await LectAttendList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }

  return (
    <div>
      <VDataList
        title={`Lecturer Attendance`}
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
        data={{
          data: LectAttendList.data,
          refetch: () => LectAttendList.refetch(),
        }}
        childCompoent={<AddUpdateLectAttend lectList={lectList} />}
      />
    </div>
  );
}
