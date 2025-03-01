import { DialogBody, DialogHeader, IconButton } from "@material-tailwind/react";
import { AiFillCloseCircle } from "react-icons/ai";
type IProps = {
  item: any;
  setOpenModal: Function;
};
export default function ShowStudentDetails(props: IProps) {
  return (
    <div>
      <DialogHeader>
        <div className="flex justify-between w-full">
          <p>Absent Student Details</p>
          <div className="flex">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => props.setOpenModal(null)}
            >
              <AiFillCloseCircle className="text-xl" />
            </IconButton>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex mx-auto justify-center ">
        <div className="container grid grid-cols-12 bg-[#f0f0f0] p-5">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p style={{ color: "black", fontWeight: "bold" }}>Email:</p>
            {/* <p style={{ marginLeft: 20 }}>{props.item.email}</p> */}
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p style={{ color: "black", fontWeight: "bold" }}>Name:</p>
            {/* <p style={{ marginLeft: 20 }}>{props.item.name}</p> */}
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p style={{ color: "black", fontWeight: "bold" }}>Subject:</p>
            {/* <p style={{ marginLeft: 20 }}>{props.item.subject}</p> */}
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <p style={{ color: "black", fontWeight: "bold" }}>Message:</p>
            {/* <p style={{ marginLeft: 20 }}>{props.item.message}</p> */}
          </div>
        </div>
      </DialogBody>
    </div>
  );
}
