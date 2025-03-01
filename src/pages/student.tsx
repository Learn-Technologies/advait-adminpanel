import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { VCard } from "../components/common/VCard";
import { ICrdAry } from "../components/home/HomePage";

export default function student() {
  const crdAry: ICrdAry[] = [
    {
      title: "Add Student",
      suTitle: "Manage student of the school",
      path: "/studentpage",
    },
    {
      title: "Attendance",
      suTitle:
        "Manage attendance of the students according to their classes/sections",
      path: "/studentAttendance",
    },
    {
      title: "Absent",
      suTitle: "Highlighted the student who is most absent",
      path: "/absent",
    },
    {
      title: "Total Students",
      suTitle: "Differentiate whole students by their Class",
      path: "/wholeStudents",
    },
  ];
  return (
    <MainLayout>
      {crdAry.map((item: ICrdAry, index: number) => (
        <React.Fragment key={index}>
          <div className="m-3">
            <VCard
              index={index}
              title={item.title}
              suTitle={item.suTitle}
              path={item.path}
            />
          </div>
        </React.Fragment>
      ))}
    </MainLayout>
  );
}
