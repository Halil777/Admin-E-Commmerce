import { HiOutlinePlus } from "react-icons/hi";
import { Sidebar, UserTable, WhiteButton } from "../../components";

const Users = () => {
  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />

      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full px-4">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <div className="  flex justify-between items-center max-sm:flex-col max-sm:gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                All Users
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center mb-6">
              <WhiteButton
                link="/users/create-user"
                text="Add"
                textSize="sm"
                py="1"
                width="24"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};
export default Users;
