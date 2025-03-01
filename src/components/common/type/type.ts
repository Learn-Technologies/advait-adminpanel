export interface IPopover {
  placement:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
}

export interface IStudentList {
  id?: string;
  createdAt: number;
  pursuingClass: string;
  studName: string;
}
export interface IClassList {
  id?: string;
  createdAt: number;
  className: string;
}
export interface IAddStudInp {
  title: string;
  name: string;
  type: string;
  multiple: boolean;
}
