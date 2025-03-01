import React from "react";
import Loading from "../common/Loading";
import { IClassList } from "../common/type/type";
import { VCard } from "../common/VCard";
import { ICrdAry } from "../home/HomePage";
import { useClassList } from "../services/firebase/apis/class/QClass";
import { useStudList } from "../services/firebase/apis/std/QStudent";

export default function WholeStudentPage() {
  const classList = useClassList();
  const studList = useStudList();
  const getFreqStudByClass: any = {};
  if (classList.isLoading || studList.isLoading) return <Loading />;
  function handleMeasurementClass(className: string) {
    if (getFreqStudByClass[className]) return getFreqStudByClass[className];
    return 0;
  }
  if (classList.data.length === 0) return <p>No Registered Class Found...</p>;

  const crdAry =
    classList.data &&
    classList.data.length > 0 &&
    classList.data.map((item: IClassList) => ({
      title: `Class: ${item.className}`,
      suTitle: `Total student in ${
        item.className
      } standard is ${handleMeasurementClass(item.className)}`,
    }));
  crdAry.push({
    title: "Whole Students",
    suTitle: `Whole Students in the school is ${studList.data.length}`,
  });

  return (
    <div>
      {crdAry.map((item: ICrdAry, index: number) => (
        <React.Fragment key={index}>
          <div className="m-3">
            <VCard
              index={index}
              title={` ${item.title}`}
              suTitle={item.suTitle}
              path={item.path}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
