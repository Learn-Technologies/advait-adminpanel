import DrawerPage from "@/layouts/DrawerPage";
import { MobileNav } from "@material-tailwind/react";
import NextNProgress from "nextjs-progressbar";
import { authStore, setSideDrawer } from "../pullState/store";
import ScrollTopButton from "./scrollButton/ScrollTopButton";

export default function RenderAllComponents() {
  const isSideDrawerOpen = authStore.useState((s) => s.isSideDrawerOpen);
  return (
    <>
      <NextNProgress
        color="yellow"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        options={{ easing: "ease", speed: 500 }}
        showOnShallow={true}
        transformCSS={(css) => {
          return <style>{css}</style>;
        }}
      />
      <ScrollTopButton />
      <DrawerPage
        isSideDrawerOpen={isSideDrawerOpen}
        setIsSideDrawer={setSideDrawer}
      />
    </>
  );
}
