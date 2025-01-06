import { Sidebar, WhiteButton } from "../../components";
import { HiOutlinePlus } from "react-icons/hi";
import SegmentTable from "../../components/segment/SegmentTable";
import ScrollToTop from "../../utils/scroll";

const Segment = () => {
  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <ScrollToTop />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                All Segments
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <WhiteButton
                link="/segments/create-segment"
                text="Add "
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          <SegmentTable />
        </div>
      </div>
    </div>
  );
};
export default Segment;
