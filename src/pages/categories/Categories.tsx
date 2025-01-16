import { CategoryTable, Sidebar, WhiteButton } from "../../components";
import { HiOutlinePlus } from "react-icons/hi";
import ScrollToTop from "../../utils/scroll";

const Categories = () => {
  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <ScrollToTop />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full px-4">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="  flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                Categories
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center mb-6">
              <WhiteButton
                link="/categories/create-category"
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          {/* Search Input Container */}

          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default Categories;
