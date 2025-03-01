import { Button, Navbar, Typography } from "@material-tailwind/react";
import { dataListStoreHelper } from "../pullState/dataListStore";
import VSearchDataList from "./listSearch/VSearchDataList";
type IProps = {
  title: string;
  isSearchOn: boolean;
  setMOdalOpen: Function;
  isDisabled: boolean;
};
export default function VDataListNavbar(props: IProps) {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h6" className="mr-4 py-1.5 text-primary">
          {props.title}
        </Typography>
        <div className="flex justify-center items-center">
          <VSearchDataList
            isSearchOn={props.isSearchOn}
            setSearchOn={dataListStoreHelper.setDataListSearchOn}
          />
          <Button
            onClick={() => props.setMOdalOpen(true)}
            variant="filled"
            className="bg-primary"
            disabled={props.isDisabled}
          >
            Add
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
