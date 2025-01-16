import { Sidebar, WhiteButton } from "../../components";
import { HiOutlinePlus } from "react-icons/hi";
import SubcategoryTable from "../../components/subcategory/SubcategoryTable";
import ScrollToTop from "../../utils/scroll";

const Subcategories = () => {
  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <ScrollToTop />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full px-4">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                Subcategories
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center mb-6">
              <WhiteButton
                link="/subcategories/create-subcategory"
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          {/* Table Container */}
          <SubcategoryTable />
        </div>
      </div>
    </div>
  );
};

export default Subcategories;
