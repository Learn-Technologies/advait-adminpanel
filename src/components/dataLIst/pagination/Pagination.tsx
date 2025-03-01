import { Button } from "@material-tailwind/react";
import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type IProps = {
  postsPerPage: any;
  totalPosts: any;
  paginate: any;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};
export default function Pagination(props: IProps) {
  const { postsPerPage, totalPosts, paginate, currentPage, setCurrentPage } =
    props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  function preNextPage(pageIncDec: string) {
    if (
      (currentPage === 1 && pageIncDec === "decrease") ||
      (pageNumbers.length === currentPage && pageIncDec === "increase")
    )
      return;
    if (pageIncDec === "decrease") return setCurrentPage(currentPage - 1);
    else return setCurrentPage(currentPage + 1);
  }
  function isDayTheme() {
    let forArrow =
      "material-symbols-outlined md:text-sm pl-1 xs:text-xs sm:text-xs text-gray-500 hover:text-white";
    let forPageCount =
      "cursor-pointer select-none border-2 items-center text-sm py-1 px-2 relative bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none";
    return {
      forArrow,
      forPageCount,
    };
  }
  return (
    <>
      <div>
        <nav className="md:flex justify-between mt-10 items-center px-4">
          <p className="cursor-pointer select-none items-center text-sm py-1.5 px-3 relative bg-primary outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-primary shadow-md focus:shadow-md">
            Total Items:{props.totalPosts}{" "}
          </p>
          <ul className="inline-flex">
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full text-primary"
              onClick={() => preNextPage("decrease")}
            >
              <FaArrowCircleLeft strokeWidth={2} className="h-4 w-4" />
            </Button>

            <div className="flex w-48 justify-center">
              {pageNumbers
                .slice(currentPage - 1, currentPage + 4)
                .map((number) => (
                  <React.Fragment key={number}>
                    <div
                      onClick={() => paginate(number)}
                      className="flex items-center space-x-1"
                    >
                      <div></div>
                      <div
                        className={`${
                          currentPage === number
                            ? "cursor-pointer select-none items-center text-sm py-1.5 px-3 relative bg-primary outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-primary shadow-md focus:shadow-md"
                            : isDayTheme().forPageCount
                        }`}
                      >
                        {number}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full text-primary"
              onClick={() => preNextPage("increase")}
            >
              <FaArrowCircleRight strokeWidth={2} className="h-4 w-4" />
            </Button>
          </ul>
        </nav>
      </div>
    </>
  );
}
