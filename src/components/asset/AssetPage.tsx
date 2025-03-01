import { useRouter } from "next/router";
import React from "react";
import Loading from "../common/Loading";
import VModal from "../common/modal/VModal";
import { VCard } from "../common/VCard";
import VUtils from "../common/VUtils";
import VDataListNavbar from "../dataLIst/VDataListNavbar";
import { dataListstore } from "../pullState/dataListStore";
import {
  useAddUpdateAssetList,
  useAssetsList,
} from "../services/firebase/asset/QAsset";
import CreateSubAssets from "./createAsset/CreateSubAssets";
import enums from "../enums/enums";

export default function AssetPage() {
  const getAssetLists = useAssetsList();
  const addUpdateAssetList = useAddUpdateAssetList();
  const isSearchOn = dataListstore.useState((s) => s.isDataListSearchOn);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isItemObj, setItemObj] = React.useState<Object | null>(null);
  const router = useRouter();
  const getPrmsData: any = router?.query?.data
    ? JSON.parse(router?.query?.data as any)
    : null;

  React.useEffect(() => {
    if (!!getPrmsData) {
      createNewAsset();
    }
  }, [!!getPrmsData]);
  if (getAssetLists.isLoading) return <Loading />;

  async function createNewAsset() {
    if (!getPrmsData) return;
    await addUpdateAssetList.mutateAsync({
      ...getPrmsData,
      createdAt: Date.now(),
    });
    router.push("/asset/assets");
    await handleToastAlert(getPrmsData);
  }

  async function handleToastAlert(data: any) {
    const { id } = data;
    if (id) return await VUtils.toastAlert("Assets Updated Successfully");
    return await VUtils.toastAlert("Assets Added Successfully");
  }

  console.log(isItemObj, "isItemObj");
  return (
    <div>
      <VDataListNavbar
        title={"Asset"}
        isSearchOn={isSearchOn}
        setMOdalOpen={() => router.push(enums.formioURL)}
        isDisabled={false}
      />
      {getAssetLists.data.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        !!getAssetLists.data &&
        getAssetLists.data.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <div className="m-5">
              <VCard
                index={index}
                title={item.assetCollection}
                suTitle={item.assetSubtitle}
                item={item}
                callBack={(data: any) => {
                  setModalOpen(true);
                  setItemObj(data);
                }}
                isEditDel={true}
              />
            </div>
          </React.Fragment>
        ))
      )}
      <VModal
        modalSize="xxl"
        openModal={isModalOpen}
        setOpenModal={setModalOpen}
        isScrollableModal={true}
        component={<CreateSubAssets item={isItemObj} />}
      />
    </div>
  );
}
