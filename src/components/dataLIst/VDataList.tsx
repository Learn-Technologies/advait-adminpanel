import { Button, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import { dataListStoreHelper, dataListstore } from "../pullState/dataListStore";
import VDataListModal from "./VDataListModal";
import VSearchDataList from "./listSearch/VSearchDataList";
import VPaginationPage from "./pagination/VPaginatePage";
import VDataListNavbar from "./VDataListNavbar";

type IProps = {
  title: string;
  data: any;
  childCompoent: React.JSX.Element;
  displayColName?: any;
  colsKey?: Array<any>;
  isViewListOnly?: boolean;
  modal: {
    isMOdalOpen: boolean;
    setMOdalOpen: (isMOdalOpen: boolean) => void;
    isModalScroll?: boolean;
  };
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
  itemState: {
    isObjItem: Object | null;
    setObjItem: (isObjItem: Object | null) => void;
  };
  listComponents?: Function;
  error?: {
    statement: boolean;
    exMsg: string;
  };
};

export default function VDataList(props: IProps) {
  const isSearchOn = dataListstore.useState((s) => s.isDataListSearchOn);
  const isSearchText = dataListstore.useState((s) => s.dataListSearchText);
  const refechList = () => {
    props.modal.setMOdalOpen(false);
    props.data.refetch();
  };
  const filterList =
    props.data.data &&
    isSearchText &&
    props.data.data.filter((item: any) => {
      if (
        item[props.displayColName["key"] as string]
          ?.toLocaleLowerCase()
          .includes(isSearchText.toLocaleLowerCase())
      ) {
        return item;
      }
    });
  React.useEffect(
    () => dataListStoreHelper.setSearchItemsLength(filterList.length),
    [isSearchText]
  );
  return (
    <div>
      {/* header */}
      <VDataListNavbar
        title={props.title}
        isSearchOn={isSearchOn}
        setMOdalOpen={props.modal.setMOdalOpen}
        isDisabled={!!props.isViewListOnly || !!props.error?.statement}
      />
      {/* header end */}
      {/* pagination  */}
      <div className="mx-auto max-w-screen-xl">
        <VPaginationPage
          filterList={isSearchText ? filterList : props.data.data}
          actions={props.actions}
          listComponents={props.listComponents}
          displayColName={props.displayColName}
          colsKey={props.colsKey}
          isViewListOnly={props.isViewListOnly}
          error={props.error}
        />
      </div>
      <VDataListModal
        childCompoent={props.childCompoent}
        itemState={props.itemState}
        modal={props.modal}
        title={props.title}
        refechList={refechList}
      />
    </div>
  );
}
