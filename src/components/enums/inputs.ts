import { IAddStudInp } from "../common/type/type";

export const classInp: IAddStudInp[] = [
  { title: "Class Name", name: "className", type: "text", multiple: false },
];

export const receiveEmail: IAddStudInp[] = [
  { title: "Email", name: "email", type: "email", multiple: false },
];
export const addStudInp: IAddStudInp[] = [
  { title: "Full Name", name: "studName", type: "text", multiple: false },
  {
    title: "Pursuing Class",
    name: "pursuingClass",
    type: "text",
    multiple: false,
  },
  {
    title: "Father's Name",
    name: "fatherName",
    type: "text",
    multiple: false,
  },
  {
    title: "Contact No.",
    name: "contact",
    type: "number",
    multiple: false,
  },
  {
    title: "Mother's Name",
    name: "motherName",
    type: "text",
    multiple: false,
  },

  {
    title: "Address",
    name: "address",
    type: "text",
    multiple: false,
  },
];

export const addLectInp: IAddStudInp[] = [
  { title: "Lecturer Name", name: "lectName", type: "text", multiple: false },
  { title: "Age", name: "age", type: "number", multiple: false },
  { title: "Email", name: "email", type: "email", multiple: false },
  { title: "Contact No.", name: "contact", type: "number", multiple: false },
  {
    title: "Alternate No.",
    name: "alternateNo",
    type: "number",
    multiple: false,
  },
  { title: "Graduation", name: "graduation", type: "text", multiple: false },
  {
    title: "Post Graduation",
    name: "postGraduation",
    type: "text",
    multiple: false,
  },
  { title: "Address", name: "address", type: "text", multiple: false },
];
