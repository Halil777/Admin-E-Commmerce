import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AiOutlineExport } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import {
  Pagination,
  ProductTable,
  RowsPerPage,
  Sidebar,
  WhiteButton,
} from "../../components";

const Products = () => {
  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                Products
              </h2>
              <p className="dark:text-whiteSecondary text-blackPrimary text-sm font-normal flex items-center">
                <span>Dashboard</span>
                <HiOutlineChevronRight className="text-sm" />
                <span>Products</span>
              </p>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center">
              <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-24 py-1 text-sm hover:border-gray-500 duration-200 flex items-center justify-center gap-x-1">
                <AiOutlineExport className="dark:text-whiteSecondary text-blackPrimary text-sm" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Export
                </span>
              </button>
              <WhiteButton
                link="/products/create-product"
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center mt-3 max-sm:flex-col max-sm:gap-1">
            <div className="relative">
              <HiOutlineSearch className="text-gray-400 text-sm absolute top-2 left-2" />
              <input
                type="text"
                className="w-48 h-8 border dark:bg-blackPrimary bg-white border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 indent-8 focus:border-gray-500 text-sm"
                placeholder="Search products..."
              />
            </div>
            <div>
              <select
                className="w-48 h-8 dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-2 pr-6 cursor-pointer hover:border-gray-500 text-sm"
                name="sort"
                id="sort"
              >
                <option value="default">Sort by</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 mt-2">
            <ProductTable />
          </div>
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4  max-sm:flex-col gap-2 max-sm:pt-4 max-sm:pb-0">
            <RowsPerPage />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
