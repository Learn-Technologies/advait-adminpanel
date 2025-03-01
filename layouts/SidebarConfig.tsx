import { MdContacts, MdEmail } from "react-icons/md";
const sidebarConfig: any = [
  {
    name: "Contact",
    icon: <MdContacts className="h-5 w-5" />,
    path: "/",
  },
  {
    name: "Receive Emails",
    icon: <MdEmail className="h-5 w-5" />,
    path: "/receiveEmails",
  },
  // {
  //   name: "Home",
  //   icon: <HiHome className="h-5 w-5" />,
  //   path: "/",
  // },
  // {
  //   name: "Students",
  //   icon: <FaBookReader className="h-5 w-5" />,
  //   path: "/student",
  // },
  // {
  //   name: "Lecturers",
  //   icon: <PiStudent className="h-5 w-5" />,
  //   path: "/lecturers",
  // },
  // {
  //   name: "Attendance",
  //   icon: <HiMiniUserPlus className="h-5 w-5" />,
  //   path: "/studentAttendance",
  // },
  // {
  //   name: "Classes",
  //   icon: <FaUsers className="h-5 w-5" />,
  //   path: "/class",
  // },
  // {
  //   name: "Events",
  //   icon: <SiEventbrite />,
  //   path: "/events",
  // },
  // {
  //   name: "Logout",
  //   icon: <PowerIcon className="h-5 w-5" />,
  //   path: "/logout",
  // },
];

export default sidebarConfig;
