import React from "react";
import { useClassList } from "../services/firebase/apis/class/QClass";
import Loading from "../common/Loading";
import { ICrdAry } from "../home/HomePage";
import { VCard } from "../common/VCard";

export default function AbsentPage() {
  const classList = useClassList();
  if (classList.isLoading) return <Loading />;
  if (classList.data.length === 0) return <p>No Registered Class Found...</p>;
  const crdAry =
    classList.data &&
    classList.data.length > 0 &&
    classList.data.map((item: any) => ({
      title: item.className,
      suTitle: `Manage Class ${item.className}`,
      path: `/showAbsent?${item.className}`,
    }));
  return (
    <div>
      {!!crdAry &&
        crdAry.length > 0 &&
        crdAry.map((item: ICrdAry, index: number) => (
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
