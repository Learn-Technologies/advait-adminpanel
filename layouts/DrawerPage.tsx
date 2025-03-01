import VUtils from "@/src/components/common/VUtils";
import enums from "@/src/components/enums/enums";
import { authStore, setSideDrawer } from "@/src/components/pullState/store";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import sidebarConfig from "./SidebarConfig";
type ISideBar = {
  isSideDrawerOpen: boolean;
  setIsSideDrawer: (isSideDrawerOpen: boolean) => void;
};
export default function DrawerPage(props: ISideBar) {
  const closeDrawer = () => props.setIsSideDrawer(false);
  const isSideDrawerOpen = authStore.useState((s) => s.isSideDrawerOpen);
  const router = useRouter();
  function handleRoutes(path: string) {
    if (path === "/logout") return onLogout();
    return router.push(path);
  }
  async function onLogout() {
    if (!(await VUtils.showConfirm("Do you really want to Logout?"))) return;
    // await logoutFirebase();
    return router.push("/");
  }
  function renderSideIconName(isName = true) {
    return sidebarConfig.map((item: any, index: number) => (
      <React.Fragment key={index}>
        <ListItem
          selected={router.pathname === item.path}
          onClick={() => handleRoutes(item.path)}
        >
          <ListItemPrefix className="text-white">{item.icon}</ListItemPrefix>
          {isName && <p className="text-white">{item.name}</p>}
          {item?.other && (
            <ListItemSuffix>{item.other.suffixIcon}</ListItemSuffix>
          )}
        </ListItem>
      </React.Fragment>
    ));
  }
  if (!props.isSideDrawerOpen)
    return (
      <div className="hidden lg:block fixed top-0 left-0 w-20 h-screen overflow-hidden bg-black text-gray-200 bg-opacity-80 z-50  border-red-500 ">
        <div className="w-full h-full bg-primary space-y-2">
          <div className="border-b-2 w-full mx-auto">
            <IconButton
              color="gray"
              onClick={() => setSideDrawer(!isSideDrawerOpen)}
              className="ml-1 m-4"
            >
              <AiFillCaretRight />
            </IconButton>
          </div>
          <div className="m-4">{renderSideIconName(false)}</div>
        </div>
      </div>
    );
  return (
    <>
      <div className="fixed top-0 left-0 w-[70%] md:w-[40%] lg:w-[30%] xl:w-[20%] h-screen rounded-r-2xl overflow-hidden bg-black text-gray-200 bg-opacity-80 z-50 ">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" h-full relative"
        >
          <div className="w-full h-full bg-primary p-6">
            <div className="mb-2 flex items-center justify-between">
              {props.isSideDrawerOpen && (
                <Typography variant="h6" className="text-white">
                  {enums.siteName}
                </Typography>
              )}
              <IconButton
                className="bg-white"
                onClick={() => setSideDrawer(!isSideDrawerOpen)}
              >
                {props.isSideDrawerOpen ? (
                  <AiFillCaretLeft className="text-gray-600" />
                ) : (
                  <AiFillCaretRight className="text-gray-600" />
                )}
              </IconButton>
            </div>
            <List>{renderSideIconName()}</List>
          </div>
        </motion.div>
      </div>
    </>
  );
}
