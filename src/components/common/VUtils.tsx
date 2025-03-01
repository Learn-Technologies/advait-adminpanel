import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";
import { removeCookies, setCookie } from "cookies-next";
import moment from "moment";
import Swal from "sweetalert2";
import { IPopover } from "./type/type";

export default class VUtils {
  static dsplyAvatar(url: string | any, style?: string) {
    return (
      <img
        src={url}
        className={`mr-3 h-10 w-10 md:h-14 md:w-14 select-none  rounded-full ${
          style && style
        }`}
        alt="Logo"
      />
    );
  }
  static handleScroller(name: string) {
    // console.log(name, "name");
    const docHeight = Number(document.body.scrollHeight);
    // console.log(docHeight - 200, "document.body.scrollHeight");
    if (name === "service") return window.scrollTo(0, docHeight / 2.41);
    else if (name === "contact us") return window.scrollTo(0, docHeight - 700);
    else if (name === "gallery") return window.scrollTo(0, docHeight / 1.45);
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }

  static showAlert(msg: string, msgIcon: string, option: any = {}) {
    try {
      let title = "";
      let message = msg;
      let icon = msgIcon;
      let options = {
        icon: icon,
        title: title,
        timer: option.timeout,
        html: message,
        ...option,
      };
      return Swal.fire(options);
    } catch (ex) {
      console.log(ex, msg, "SUCCESS");
      return new Promise((resolve) => resolve({}));
    }
  }

  static showConfirm(
    title: any,
    description = "",
    icon = "warning",
    dangerMode = false,
    objOptions: any = {}
  ) {
    return new Promise((resolve) => {
      let options = {
        title,
        icon,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Reject`,
        ...objOptions,
      };
      if (description) options.text = description;
      Swal.fire(options).then((result: { isConfirmed: any }) => {
        if (!result.isConfirmed) resolve(false);
        resolve(true);
      });
    });
  }

  static transformFirebaseResult(ref: any) {
    if (!ref) return null;
    if (Array.isArray(ref)) return ref;
    if (Array.isArray(ref.docs))
      return ref.docs.map((item: any) => ({ id: item.id, ...item.data() }));
    else if (typeof ref?.data === "function")
      return { id: ref.id, ...ref.data() };
    else if (typeof ref === "object") return ref;
    return null;
  }

  static async cookieSet(token: string, data: any) {
    return setCookie(token, await data);
  }
  static async rmvCookies(key: string) {
    return removeCookies(key);
  }

  static forToolTip(
    tpName: string,
    element: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  ) {
    return (
      <Tooltip
        content={tpName}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        {element}
      </Tooltip>
    );
  }
  static textImgAvatar(
    variant: "img" | "text",
    titleUrl: string,
    style?: string
  ) {
    if (variant === "img")
      return (
        <div className="h-12 w-12 rounded-full flex border border-gray-400 bg-white">
          <img
            src={titleUrl}
            className={`h-12 w-12 select-none  rounded-full ${style && style}`}
            alt="Logo"
          />
        </div>
      );
    return (
      <div className="h-12 w-12 rounded-full flex border border-gray-400 bg-white">
        <p className="flex mx-auto items-center uppercase font-sans text-gray-400 text-2xl">
          {titleUrl ? titleUrl[0] : "A"}
        </p>
      </div>
    );
  }
  static showTime(date: number | string, format: string) {
    return moment(date).format(format);
  }
  static async toastAlert(
    title: string,
    position = "top-end",
    timer = 3000,
    icon: any = "success"
  ) {
    let options: any = {
      position: position,
      timer: timer,
    };
    const Toast = await Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
      ...options,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    return Toast.fire({
      icon: icon,
      title: title,
    });
  }
  static popOver(
    placement: IPopover,
    button: any,
    item: any,
    className?: string
  ) {
    return (
      <Popover placement={placement.placement}>
        <PopoverHandler>
          <div>{button}</div>
        </PopoverHandler>
        <PopoverContent className={`${className} p-0`}>{item}</PopoverContent>
      </Popover>
    );
  }
}
