import { Dialog } from "@material-tailwind/react";
import React, { Fragment } from "react";
type IModal = {
  openModal: any;
  setOpenModal: (openModal: any) => void;
  modalSize: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  component: JSX.Element;
  otherProps?: any;
  isScrollableModal?: boolean;
};

export default function VModal(props: IModal) {
  const [size, setSize] = React.useState(props.modalSize);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 855px)");

    function handleMediaQuery(event: MediaQueryListEvent) {
      setSize(event.matches ? "xxl" : props.modalSize);
    }

    // Add event listener when component mounts
    mediaQuery.addEventListener("change", handleMediaQuery);

    // Remove event listener when component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
    };
  }, [props.modalSize]);

  return (
    <Fragment>
      <Dialog
        open={props.openModal}
        size={size}
        handler={props.setOpenModal}
        {...props.otherProps}
        style={{
          maxHeight: "100%",
          overflowY: props.isScrollableModal && "scroll",
        }}
      >
        {props.component}
      </Dialog>
    </Fragment>
  );
}
