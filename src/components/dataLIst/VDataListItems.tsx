import { InboxIcon } from "@heroicons/react/24/solid";
import { CardBody } from "@material-tailwind/react";
import React from "react";
import ListItems from "./ListItems";

type IProps = {
  data: any;
  isViewListOnly?: boolean;
  actions: {
    onDelete?: Function;
    onEdit?: Function;
    isHandlerRequired?: {
      isDelete: boolean;
      isEdit: boolean;
    };
    otherActions?: {
      handleAction: Function;
      icon?: any;
      iconName?: any;
    };
  };
  listComponents?: Function;
  displayColName?: any;
  colsKey?: Array<any>;
  error?: {
    statement: boolean;
    exMsg: string;
  };
};
export default function VDataListItems(props: IProps) {
  if (props.error?.statement)
    return (
      <CardBody className="px-0">
        <div className="flex flex-col items-center justify-center h-full">
          <InboxIcon className="h-10 w-10 text-5xl text-primary" />
          <p className="text-primary text-2xl">{props.error?.exMsg}</p>
        </div>
      </CardBody>
    );
  else if (props.data.data.length === 0)
    return (
      <CardBody className="px-0">
        <div className="flex flex-col items-center justify-center h-full">
          <InboxIcon className="h-10 w-10 text-5xl text-primary" />
          <p className="text-primary text-2xl">No Data Found!</p>
        </div>
      </CardBody>
    );

  return (
    <div>
      <CardBody className="px-0">
        <div className="bg-white ">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            {props.data.data &&
              props.data.data.map((item: any, index: number) => {
                if (props.listComponents)
                  return (
                    <React.Fragment key={index}>
                      {props.listComponents(item)}
                    </React.Fragment>
                  );
                return (
                  <React.Fragment key={index}>
                    <ListItems
                      item={item}
                      actions={props.actions}
                      displayColName={props.displayColName}
                      colsKey={props.colsKey}
                      isViewListOnly={props.isViewListOnly}
                    />
                    {/* <CategoryList item={item} actions={props.actions} /> */}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </CardBody>
    </div>
  );
}
