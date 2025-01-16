import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";
// import SearchInput from "./SearchInput";
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <header className="dark:bg-blackPrimary bg-whiteSecondary relative">
      <div className="flex justify-between items-center px-9 py-4 max-xl:flex-col max-xl:gap-y-7 max-[400px]:px-4">
        <HiOutlineMenu
          className="text-2xl dark:text-whiteSecondary text-blackPrimary absolute bottom-7 left-5 xl:hidden max-sm:static max-sm:order-1 cursor-pointer"
          onClick={() => dispatch(setSidebar())}
        />
        <Link to="/admin">
          {darkMode ? (
            <img src="/images/footerLogo.svg" className="w-40" alt="" />
          ) : (
            <img src="/images/logo.svg" className="w-40" alt="" />
          )}
          {/* <FaReact className="text-4xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer" /> */}
        </Link>
        {/* <SearchInput /> */}
        <div className="flex gap-4 items-center max-xl:justify-center">
          {/* <span className="dark:text-whiteSecondary text-blackPrimary">EN</span> */}
          {darkMode ? (
            <HiOutlineSun
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          ) : (
            <HiOutlineMoon
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          )}
          {/* <Link to="/notifications">
            <HiOutlineBell className="text-xl dark:text-whiteSecondary text-blackPrimary" />
          </Link> */}
          <Link to="/admin/">
            <div className="flex gap-2 items-center">
              <img
                src="/images/alem-logo.png"
                alt="profile"
                className=" w-2xl h-10"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
