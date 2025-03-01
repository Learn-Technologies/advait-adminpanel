// import React from "react";

// export default function ReceiveEmailPage() {
//   return <div>ReceiveEmailPage</div>;
// }

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
import AddUpdateReceiveEmails from "./AddUpdateReceiveEmails";
import {
  useDeleteReceiveEmails,
  useReceiveEmailsList,
} from "../services/query/QReceiveEmails";
export default function ReceiveEmailPage() {
  const receiveEmailsList = useReceiveEmailsList();
  const delReceiveEmailsList = useDeleteReceiveEmails();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  if (receiveEmailsList.isLoading) return <Loading />;
  if (receiveEmailsList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    await delReceiveEmailsList.mutateAsync(data);
    await receiveEmailsList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }
  return (
    <div>
      <VDataList
        title="Receive Emails"
        displayColName={{ title: "Email", key: "email" }}
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
        data={receiveEmailsList}
        childCompoent={<AddUpdateReceiveEmails />}
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
