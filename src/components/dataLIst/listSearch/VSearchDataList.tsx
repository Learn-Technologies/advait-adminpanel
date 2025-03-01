import { IconButton, Input } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import {
  dataListstore,
  dataListStoreHelper,
} from "../../pullState/dataListStore";

type IVSearchDataList = {
  isSearchOn: boolean;
  setSearchOn: (isSearchOn: boolean) => void;
};
export default function VSearchDataList(props: IVSearchDataList) {
  const isSearchText = dataListstore.useState((s) => s.dataListSearchText);
  const searchedItemsLength = dataListstore.useState(
    (s) => s.searchedItemsLength
  );
  if (!props.isSearchOn)
    return (
      <IconButton
        color="blue-gray"
        variant="outlined"
        className="mr-3"
        onClick={() => props.setSearchOn(!props.isSearchOn)}
      >
        <AiOutlineSearch className="text-2xl" />
      </IconButton>
    );
  return (
    <div className="mr-6">
      <Input
        variant="static"
        placeholder="Search.."
        color="black"
        icon={
          <IconButton
            color="blue-gray"
            variant="text"
            size="sm"
            onClick={() => {
              props.setSearchOn(!props.isSearchOn);
              dataListStoreHelper.setDataListSearchText("");
            }}
          >
            <IoMdClose className="text-xl" />
          </IconButton>
        }
        onChange={(e: any) =>
          dataListStoreHelper.setDataListSearchText(e.target.value)
        }
        success={!!isSearchText && searchedItemsLength > 0}
        error={!!isSearchText && searchedItemsLength === 0}
      />
    </div>
  );
}
