import { Sidebar, WhiteButton } from "../../components";
import { HiOutlinePlus } from "react-icons/hi";
import BrandTable from "../../components/brand/BrandTable";
import ScrollToTop from "../../utils/scroll";

const Brand = () => {
  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <ScrollToTop />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full px-4">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="  flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                All Brands
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center mb-6">
              <WhiteButton
                link="/brands/create-brand"
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>

          <BrandTable />
        </div>
      </div>
    </div>
  );
};
export default Brand;
