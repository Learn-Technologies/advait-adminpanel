import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Highlighter from "react-highlight-words";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import VUtils from "../common/VUtils";
import { dataListstore } from "../pullState/dataListStore";
import VDataListButton from "./VDataListButton";
type IProps = {
  item: any;
  isViewListOnly?: boolean;
  actions: {
    onDelete?: Function;
    onEdit?: Function;
    otherActions?: {
      handleAction: Function;
      icon?: any;
      iconName?: any;
    };
  };
  listComponents?: Function;
  displayColName?: any;
  colsKey?: Array<any>;
};

export default function ListItems(props: IProps) {
  const isSearchOn = dataListstore.useState((s) => s.isDataListSearchOn);
  const issearchText = dataListstore.useState((s) => s.dataListSearchText);
  const { displayColName } = props;
  console.log(props.colsKey, "props.colsKey");

  const actionName = [
    {
      title: "Edit",
      icon: <MdEdit className="text-xl text-blue-500 select-none" />,
    },
    {
      title: "Delete",
      icon: <MdDelete className="text-xl text-red-600 select-none" />,
    },
    { title: "View", icon: props.actions.otherActions?.icon },
  ];
  function highLightText() {
    if (isSearchOn)
      return (
        <Highlighter
          searchWords={[issearchText]}
          autoEscape={true}
          textToHighlight={
            props.item?.[displayColName ? displayColName["key"] : "title"]
          }
          highlightStyle={{
            color: "white",
            backgroundColor: "#948354",
          }}
        />
      );
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Typography variant="h6" color="blue-gray">
          {displayColName ? (
            <>
              {displayColName["title"]}: {props.item[displayColName["key"]]}
            </>
          ) : (
            props.item["title"]
          )}
        </Typography>
        {props.colsKey &&
          props.colsKey.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>{handleQuill(item)}</React.Fragment>
            );
          })}
      </div>
    );
  }
  async function handleActions(item: any) {
    if (item.title === "View")
      return await props.actions.otherActions?.handleAction(props.item);
    else if (item.title === "Edit" && !!props.actions.onEdit)
      return await props.actions.onEdit(props.item);
    if (!!props.actions.onDelete)
      return await props.actions.onDelete(props.item);
  }
  function handleQuill(mapItem: any) {
    if (mapItem.textType === "quill")
      return (
        <Typography variant="h6" color="blue-gray">
          {mapItem.title}:
          <div
            dangerouslySetInnerHTML={{
              __html: props.item[mapItem.key],
            }}
          />
        </Typography>
      );
    else if (mapItem.textType !== "quill" && props.item[mapItem.key]) {
      return (
        <Typography variant="h6" color="blue-gray">
          {mapItem.title}: {props.item[mapItem.key]}
        </Typography>
      );
    }
  }
  function renderItems() {
    return actionName.filter((action) => {
      // Remove 'Edit' if onEdit is false
      if (action.title === "Edit" && !props.actions.onEdit) return false;
      // Remove 'Delete' if onDelete is false
      if (action.title === "Delete" && !props.actions.onDelete) return false;
      // Keep the rest of the actions
      return true;
    });
  }
  console.log(actionName, "actionName");
  function showIcons() {
    if (!!props.actions.otherActions && !props.isViewListOnly)
      return (
        <div className="flex h-fit">
          {VUtils.popOver(
            { placement: "bottom-end" },
            <CiMenuKebab />,
            <div className="p-3 bg-secondary text-primary rounded-md">
              {renderItems().map((item, index: number) => (
                <React.Fragment key={index}>
                  <List
                    className={"p-0.5"}
                    onClick={async () => await handleActions(item)}
                  >
                    <ListItem>
                      <ListItemPrefix>{item.icon}</ListItemPrefix>
                      {item.title}
                    </ListItem>
                  </List>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      );
    else if (!props.actions.otherActions && !props.isViewListOnly) {
      return (
        <div className="flex h-fit">
          {!!props.actions.onEdit && (
            <VDataListButton
              title="Edit"
              callBack={async () => {
                if (!!props.actions.onEdit) {
                  await props.actions.onEdit(props.item);
                }
              }}
              icon={<MdEdit className="text-xl text-blue-500 select-none" />}
            />
          )}
          {!!props.actions.onDelete && (
            <VDataListButton
              title="Delete"
              callBack={async () => {
                if (!!props.actions.onDelete) {
                  await props.actions.onDelete(props.item);
                }
              }}
              icon={<MdDelete className="text-xl text-red-600 select-none" />}
              className="ml-2"
            />
          )}
        </div>
      );
    }
    return (
      <div className="flex h-fit">
        {VUtils.forToolTip(
          "View",
          <div
            className="border border-gray-400 p-3 rounded-full flex justify-center bg-white cursor-pointer hover:bg-gray-300"
            onClick={async () => await handleActions({ title: "View" })}
          >
            {props.actions.otherActions?.icon}
          </div>
        )}
      </div>
    );
  }
  return (
    <List className="p-0.5">
      <ListItem className="flex justify-between items-center border shadow-md">
        <div className="flex justify-between items-center">
          <ListItemPrefix>
            {VUtils.textImgAvatar("text", props?.item?.title)}
          </ListItemPrefix>
          <div>
            {highLightText()}
            <Typography variant="small" color="gray" className="font-normal">
              {VUtils.showTime(props.item.createdAt, "YYYY-MM-DD HH:mm:ss")}
            </Typography>
          </div>
        </div>
        {showIcons()}
      </ListItem>
    </List>
  );
}
