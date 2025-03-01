import React from "react";
import { VCard } from "../common/VCard";
export interface ICrdAry {
  title: string;
  suTitle: string;
  path: string;
}
export default function LecturerPage() {
  const crdAry: ICrdAry[] = [
    {
      title: "Add Lecturer",
      suTitle: "Manage lecturers of the school",
      path: "/lecturer/createLecturer",
    },
    {
      title: "Attendance",
      suTitle: "Manage lecturers attendance of the school",
      path: "/lecturer/attendanceLecturer",
    },
    {
      title: "Absent",
      suTitle: "Highlighted the lecturer who is most absent",
      path: "/lecturer/absentLecturer",
    },
  ];
  return (
    <>
      <div className="text-black">
        {crdAry.map((item: ICrdAry, index: number) => (
          <React.Fragment key={index}>
            <div className="m-5">
              <VCard
                index={index}
                title={item.title}
                suTitle={item.suTitle}
                path={item.path}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
