import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { dataListStoreHelper } from "../../pullState/dataListStore";
import VPaginationPage from "../pagination/VPaginatePage";

type IVSearchItems = {
  title: string;
  isSearchOn: boolean;
  setSearchOn: (isSearchOn: boolean) => void;
  actions: {
    onDelete: Function;
    onEdit: Function;
  };
  dataToSearch: any;
};
export default function VSearchModal(props: IVSearchItems) {
  const individualList = props.dataToSearch;
  const [isSearchedText, setSearchedText] = React.useState<string>("");

  const filterList =
    individualList.data &&
    isSearchedText &&
    individualList.data.filter((item: any, index: number) => {
      if (
        item.title
          .toLocaleLowerCase()
          .includes(isSearchedText.toLocaleLowerCase())
      ) {
        return item;
      }
    });

  return (
    <div className="mt-5 w-full sm:container mx-auto border-2 border-red-900">
      <div className="flex justify-between items-center mx-5">
        <Typography
          variant="h4"
          className="uppercase text-primary font-semibold"
        >
          Search {props.title}
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => props.setSearchOn(!props.isSearchOn)}
        >
          <AiFillCloseCircle className="text-2xl" />
        </IconButton>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          onChange={(e: any) => {
            setSearchedText(e.target.value);
            dataListStoreHelper.setDataListSearchText(e.target.value);
          }}
          className="border-2 w-[80%] h-14 mt-4"
          placeholder="search By Title,Id"
        />
      </div>
      <VPaginationPage filterList={filterList} actions={props.actions} />
    </div>
  );
}
