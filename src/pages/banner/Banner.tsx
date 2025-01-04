import { FC } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Sidebar, WhiteButton } from "../../components";
import BannerTable from "../../components/banner/BannerTable";

const Banner: FC = () => {
  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                Banners
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center mb-6">
              <WhiteButton
                link="/banners/create-banner" // Update this link
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 mt-2">
            <BannerTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
