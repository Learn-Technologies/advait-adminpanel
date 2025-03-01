import {
  IconButton,
  ListItem,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { LuListFilter } from "react-icons/lu";
import VAutocomplete from "../common/inputs/VAutoComplete";
import Loading from "../common/Loading";
import VModal from "../common/modal/VModal";
import VSearchDataList from "../dataLIst/listSearch/VSearchDataList";
import { dataListstore, dataListStoreHelper } from "../pullState/dataListStore";
import { useStudList } from "../services/firebase/apis/std/QStudent";
import { useStudAttendList } from "../services/firebase/apis/std/QTakeStdAttendance";
import ShowStudentDetails from "./ShowStudentDetails";
export default function ShowAbsentStudentPage() {
  const router = useRouter();
  const getClass = router.asPath.split("?")[1]?.toLowerCase();
  const studList = useStudList();
  const studAttendList = useStudAttendList();
  const [isHandleViewPage, setHandleViewPage] = React.useState<Object | null>(
    null
  );
  const isSearchOn = dataListstore.useState((s) => s.isDataListSearchOn);
  const [isFilterOn, setFilterOn] = React.useState<boolean>(false);
  const [isilterNumber, setFilterNumber] = React.useState<number>(0);
  React.useEffect(() => {
    if (!getClass) {
      router.push("studentAttendance");
    }
  }, [getClass]);

  if (studAttendList.isLoading || studList.isLoading) return <Loading />;
  if (studAttendList.isError) return <>Error</>;

  const fltrStudAttendListByClass =
    studAttendList.data &&
    studAttendList.data.length > 0 &&
    studAttendList.data.filter(
      (item: any) => item.pursuingClass?.toLowerCase() === getClass
    );
  const absntAry = [5, 10, 15];
  const freqAbsntStud: any = {};

  for (const item of fltrStudAttendListByClass) {
    for (const studObj in item) {
      if (!freqAbsntStud[studObj]) {
        if (!item[studObj]) {
          freqAbsntStud[studObj] = 1;
        }
      } else {
        if (!item[studObj]) {
          freqAbsntStud[studObj]++;
        }
      }
    }
  }
  const freqAbsntStudAry = Object.entries(freqAbsntStud).map(
    ([key, count]) => ({
      name: [key],
      count: count,
    })
  );
  function handleFilter() {
    if (isilterNumber > 0)
      return freqAbsntStudAry.filter(
        (item: any) => item.count <= isilterNumber
      );
    return freqAbsntStudAry;
  }

  if (freqAbsntStudAry.length === 0)
    return <p>Absent students are not found in {getClass} class...</p>;
  return (
    <div>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography variant="h6" className="mr-4 py-1.5 text-primary">
            Absent Student {getClass}
          </Typography>
          <div className="flex justify-center items-center">
            <VSearchDataList
              isSearchOn={isSearchOn}
              setSearchOn={dataListStoreHelper.setDataListSearchOn}
            />
            <IconButton
              color="blue-gray"
              variant="outlined"
              className="mr-3"
              onClick={() => setFilterOn(!isFilterOn)}
            >
              <LuListFilter className="text-2xl" />
            </IconButton>
            {isFilterOn && (
              <VAutocomplete
                options={absntAry}
                className="w-16"
                type="number"
                getValue={(data: string) => setFilterNumber(Number(data))}
              />
            )}
          </div>
        </div>
      </Navbar>
      <div className="mx-auto max-w-screen-xl">
        {handleFilter().length === 0 ? (
          <p>No data found</p>
        ) : (
          handleFilter().map((item: any, index: number) => (
            <React.Fragment key={index}>
              <div className="mx-4">
                <ListItem className="flex justify-between items-center border shadow-md ">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-red-600">{item.count}</p>
                  </div>
                  <IconButton
                    color="blue-gray"
                    variant="text"
                    className="flex justify-center"
                    onClick={() => setHandleViewPage(!isHandleViewPage)}
                  >
                    <FaRegEye className="text-xl text-blue-500 select-none" />
                  </IconButton>
                </ListItem>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
      <VModal
        modalSize="xxl"
        openModal={isHandleViewPage}
        setOpenModal={setHandleViewPage}
        isScrollableModal={true}
        component={
          <ShowStudentDetails
            item={isHandleViewPage}
            setOpenModal={setHandleViewPage}
          />
        }
      />
    </div>
  );
}
