import { Store } from "pullstate";

interface IDataListStore {
  isDataListSearchOn: boolean;
  dataListSearchText: string;
  searchedItemsLength: number;
}

let initialState: IDataListStore = {
  isDataListSearchOn: false,
  dataListSearchText: "",
  searchedItemsLength: 0,
};

export const dataListstore = new Store<IDataListStore>(initialState);
export class dataListStoreHelper {
  static setDataListSearchOn(isSearchModal: boolean) {
    return dataListstore.update((s) => {
      s.isDataListSearchOn = isSearchModal;
    });
  }
  static setDataListSearchText(searchText: string) {
    return dataListstore.update((s) => {
      s.dataListSearchText = searchText;
    });
  }
  static setSearchItemsLength(dataLength: number) {
    return dataListstore.update((s) => {
      s.searchedItemsLength = dataLength;
    });
  }
}
