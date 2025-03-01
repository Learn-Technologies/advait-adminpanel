import React from "react";
import VUtils from "../common/VUtils";
type IProps = {
  title: string;
  icon: React.JSX.Element;
  callBack: Function;
  className?: string;
};
export default function VDataListButton(props: IProps) {
  return VUtils.forToolTip(
    props.title,
    <div
      className={`border border-gray-400 p-3 rounded-full flex items-center bg-white cursor-pointer hover:bg-gray-300 ${props.className}`}
      onClick={async () => await props.callBack()}
    >
      {props.icon}
    </div>
  );
}
