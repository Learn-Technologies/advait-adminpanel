import React from "react";
import Loading from "../common/Loading";
import { VCard } from "../common/VCard";
import { useClassList } from "../services/firebase/apis/class/QClass";

export default function StudentAttendancePage() {
  const classList = useClassList();
  if (classList.isLoading) return <Loading />;
  const crdAry =
    classList.data &&
    classList.data.length > 0 &&
    classList.data.map((item: any) => ({
      title: item.className,
      suTitle: `Manage Class ${item.className}`,
      path: `/takeStdAttendance?${item.className}`,
    }));

  return (
    <div>
      {crdAry.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <div className="m-3">
            <VCard
              index={index}
              title={`Class: ${item.title}`}
              suTitle={item.suTitle}
              path={item.path}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
