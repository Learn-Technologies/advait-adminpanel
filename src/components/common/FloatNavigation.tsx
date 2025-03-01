import Link from "next/link";
import { useRouter } from "next/router";
import { FaBookReader } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { HiMiniUserPlus } from "react-icons/hi2";
import { PiStudent } from "react-icons/pi";
import VUtils from "./VUtils";
export default function FloatNavigation() {
  const router = useRouter();
  function handleTextColor(path: string) {
    if (router.pathname === path) return "hover:text-primary-500 text-primary";
    return "hover:text-primary text-gray-500";
  }
  return (
    <div className="flex w-full justify-center">
      <div className="bg-transparent pt-12 sm:pt-16 lg:pt-10 fixed bottom-0">
        {/* nav - start */}
        <nav className="sticky bottom-0 mx-auto w-full sm:max-w-md">
          {VUtils.forToolTip(
            "Lecturers",
            <Link
              className={`absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-3xl  text-white shadow-lg transition duration-100  sm:-top-8 sm:h-16 sm:w-16 
            ${
              router.pathname === "/lecturers"
                ? "hover:bg-primary-500 bg-primary"
                : "hover:bg-primary bg-gray-500"
            }
            `}
              href={"/lecturers"}
            >
              <PiStudent className="h-8 w-8" />
            </Link>
          )}
          <div className="flex justify-between gap-8 border-t bg-white px-10 py-4 text-xs sm:rounded-t-xl sm:border-transparent sm:text-sm sm:shadow-2xl">
            <Link href={"/"}>
              <span
                className={`flex flex-col items-center gap-1 ${handleTextColor(
                  "/"
                )}`}
              >
                <HiHome className="h-7 w-7" />
                <span>Home</span>
              </span>
            </Link>

            <Link
              href={"/student"}
              className={`mr-4 flex flex-col items-center gap-1 text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600 sm:mr-8 ${handleTextColor(
                "/student"
              )}`}
            >
              <FaBookReader className="h-7 w-7" />
              <span>Students</span>
            </Link>
            {/* <a href="#"> */}
            <Link
              href={"/studentAttendance"}
              className={`ml-4 flex flex-col items-center gap-1 text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600 sm:ml-8 ${handleTextColor(
                "/studentAttendance"
              )}`}
            >
              <HiMiniUserPlus className="h-8 w-8" />
              <span>Attendance</span>
            </Link>
            {/* </a> */}

            <Link
              href={"/class"}
              className={`flex flex-col items-center gap-1 text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600 ${handleTextColor(
                "/class"
              )}`}
            >
              <FaUsers className="h-7 w-7" />
              <span>Classes</span>
            </Link>
          </div>
        </nav>
        {/* nav - end */}
      </div>
    </div>
  );
}
