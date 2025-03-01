// import React from "react";
// import { VCard } from "../common/VCard";
// export interface ICrdAry {
//   title: string;
//   suTitle: string;
//   path: string;
// }
// export default function HomePage() {
//   const crdAry: ICrdAry[] = [
//     {
//       title: "Class List",
//       suTitle: "Manage classes/sections of the school",
//       path: "/class",
//     },
//     {
//       title: "Students",
//       suTitle: "Manage students of the school",
//       path: "/student",
//     },
//     {
//       title: "Lecturers",
//       suTitle: "Manage lecturers of the school",
//       path: "/lecturers",
//     },

//     {
//       title: "Events",
//       suTitle: "Manage events of the school",
//       path: "/events",
//     },

//     {
//       title: "Assets",
//       suTitle: "Manage assets of the school",
//       path: "/asset/assets",
//     },
//   ];
//   return (
//     <>
//       <div className="text-black">
//         {crdAry.map((item: ICrdAry, index: number) => (
//           <React.Fragment key={index}>
//             <div className="m-5">
//               <VCard
//                 index={index}
//                 title={item.title}
//                 suTitle={item.suTitle}
//                 path={item.path}
//               />
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </>
//   );
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
import AddUpdateContact from "./AddUpdateContact";
import { useContactList } from "../services/query/QContact";
import ContactViewPage from "./ContactViewPage";
import { setContactList } from "../pullState/store";
export default function HomePage() {
  const contactList = useContactList();
  const delClassList = useDeleteClassList();
  const [isMOdalOpen, setMOdalOpen] = React.useState<boolean>(false);
  const [isObjBrand, setObjBrand] = React.useState<Object | null>(null);
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  React.useEffect(() => {
    if (contactList && contactList?.data?.length > 0) {
      setContactList(contactList.data.length);
    }
  }, [contactList?.data]);
  if (contactList.isLoading) return <Loading />;
  if (contactList.isError) return <>Error</>;
  async function onDeleteList(data: any) {
    if (!(await VUtils.showConfirm("Are you sure to delete?"))) return;
    // await delClassList.mutateAsync(data);
    await contactList.refetch();
    await VUtils.toastAlert("Deleted Successfully");
  }

  return (
    <div>
      <VDataList
        title="Advait Contact List"
        displayColName={{ title: "Email", key: "email" }}
        colsKey={[
          { title: "Name", key: "name" },
          { title: "Subject", key: "subject" },
        ]}
        modal={{
          isMOdalOpen: isMOdalOpen,
          setMOdalOpen: setMOdalOpen,
          isModalScroll: true,
        }}
        actions={{
          otherActions: {
            handleAction: (data: any) => {
              console.log(data, "check data");
              setHandleViewPage(data);
            },
            icon: <FaRegEye />,
            iconName: "Show Contact",
          },
        }}
        itemState={{
          isObjItem: isObjBrand,
          setObjItem: setObjBrand,
        }}
        data={contactList}
        childCompoent={<AddUpdateContact />}
        // DisplayContact
      />
      <VModal
        modalSize="xxl"
        openModal={isHandleViewPage}
        setOpenModal={setHandleViewPage}
        isScrollableModal={true}
        component={
          <ContactViewPage
            item={isHandleViewPage}
            setOpenModal={setHandleViewPage}
          />
          // <>visible </>
        }
      />
    </div>
  );
}
