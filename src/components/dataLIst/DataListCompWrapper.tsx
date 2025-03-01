import React from "react";
type IProps = {
  listComponent: React.ComponentType<any>;
};
// work like react create element
/* <div>{React.createElement(props.listComponent, { customProp: "someValue" })}</div> */
export default function DataListCompWrapper(props: IProps) {
  return <props.listComponent customProp="someValue" {...props} />;
}
