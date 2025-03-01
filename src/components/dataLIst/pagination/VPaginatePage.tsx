import React from "react";
import VDataListItems from "../VDataListItems";
import Pagination from "./Pagination";
import enums from "@/src/components/enums/enums";

type IProps = {
  filterList: any;
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
export default function VPaginationPage(props: IProps) {
  const itemobjList = props.filterList;
  //pagination strt
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(enums.POST_PER_PAGE.PAGE_NO);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    itemobjList && itemobjList.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  //pagination end
  return (
    <div>
      {/* pagination lists */}
      <div className="mx-auto max-w-screen-xl">
        <VDataListItems
          data={{ data: currentPosts.length > 0 ? currentPosts : itemobjList }}
          actions={props.actions}
          listComponents={props.listComponents}
          displayColName={props.displayColName}
          colsKey={props.colsKey}
          isViewListOnly={props.isViewListOnly}
          error={props.error}
        />
      </div>
      {/* pagination numbers */}
      <div>
        {itemobjList && itemobjList.length > enums.POST_PER_PAGE.PAGE_NO && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={itemobjList?.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
