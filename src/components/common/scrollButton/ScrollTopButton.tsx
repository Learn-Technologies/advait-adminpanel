import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
export default function ScrollTopButton() {
  const [ScrollTopButton, setScrollTopButton] = React.useState(false);
  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setScrollTopButton(true);
      } else {
        setScrollTopButton(false);
      }
    });
  }, []);

  return (
    <>
      {ScrollTopButton && (
        <div
          onClick={() => scrollUp()}
          className="border z-10 select-none border-white w-16 bg-primary text-white fixed bottom-20 justify-center items-center md:right-32 right-2 cursor-pointer flex h-16 text-3xl rounded-full"
        >
          <FaLongArrowAltUp className="text-white text-lg" />
        </div>
      )}
    </>
  );
}
