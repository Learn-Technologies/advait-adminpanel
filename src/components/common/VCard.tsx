import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import VDataListButton from "../dataLIst/VDataListButton";
import { MdDelete, MdEdit } from "react-icons/md";
import enums from "../enums/enums";
type IProps = {
  title: string;
  suTitle: string;
  path?: string;
  index: number;
  callBack?: Function;
  item?: any;
  isEditDel?: boolean;
};

export function VCard(props: IProps) {
  console.log(props.item, "item");
  const router = useRouter();
  const url = enums.formioURL;
  function handleOnclick() {
    if (props.path && !!props.callBack) {
      props.callBack(props.item);
      router.push(props.path);
    }
    if (props.path) {
      router.push(props.path);
    }
    if (!!props.callBack) {
      props.callBack(props.item);
    }
  }
  async function handleDelete() {
    return;
  }
  return (
    <Card
      className="w-full cursor-pointer hover:bg-[#f0f0f0]"
      onClick={() => handleOnclick()}
    >
      <CardBody>
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <div className="text-4xl text-primary mt-[-12px]">
              {props.index + 1}.
            </div>
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-secondary"
              >
                {props.title}
              </Typography>
              <Typography>{props.suTitle}</Typography>
            </div>
          </div>
          {props.isEditDel && (
            <div className="flex h-fit">
              <VDataListButton
                title="Edit"
                callBack={async () =>
                  router.push(
                    `${url}${encodeURIComponent(JSON.stringify(props.item.id))}`
                  )
                }
                icon={<MdEdit className="text-xl text-blue-500 select-none" />}
              />
              <VDataListButton
                title="Delete"
                callBack={async () => await handleDelete()}
                icon={<MdDelete className="text-xl text-red-600 select-none" />}
                className="ml-2"
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
