import enums from "@/src/components/enums/enums";
import { authStore, setSideDrawer } from "@/src/components/pullState/store";
import {
  Badge,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";

export default function Header() {
  const isSideDrawerOpen = authStore.useState((s) => s.isSideDrawerOpen);
  const contactLength = authStore.useState((s) => s.contactLength);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setSideDrawer(false)
    );
  }, []);

  return (
    <div className="w-full">
      <Navbar className="py-2 lg:py-4 w-full max-w-full bg-primary rounded-none">
        <div className="flex w-full items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <IconButton
              variant="text"
              className="lg:hidden block h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
              ripple={false}
              onClick={() => setSideDrawer(!isSideDrawerOpen)}
            >
              {isSideDrawerOpen ? (
                <MdClose className="text-2xl text-white" />
              ) : (
                <HiMenuAlt2 className="text-2xl text-white" />
              )}
            </IconButton>
            <Typography
              as="a"
              href="#"
              className="ml-4 cursor-pointer py-1.5 font-medium text-white"
            >
              {enums.siteName}
            </Typography>
          </div>
          <Badge content={contactLength} color="green">
            <IconButton className="bg-white" onClick={() => router.push("/")}>
              <RiNotification2Fill className="text-lg text-secondary" />
            </IconButton>
          </Badge>
        </div>
      </Navbar>
    </div>
  );
}
