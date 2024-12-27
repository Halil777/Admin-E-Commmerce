import {
  HiLogin,
  HiOutlineHome,
  HiUserGroup,
  HiOutlineX,
  HiOutlineUser,
} from "react-icons/hi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineTag } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdPolicy } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const sidebarClass: string = isSidebarOpen
    ? "sidebar-open"
    : "sidebar-closed";

  const navActiveClass: string =
    "block dark:bg-whiteSecondary flex items-center self-stretch gap-2 py-2 px-4 cursor-pointer max-xl:py-1 dark:text-blackPrimary bg-white text-blackPrimary text-sm";
  const navInactiveClass: string =
    "block flex items-center self-stretch gap-2 py-2 px-4 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-1 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary text-sm";

  return (
    <div className="relative">
      <div
        className={`w-64 h-[100vh] dark:bg-blackPrimary bg-whiteSecondary pt-4 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 ${sidebarClass}`}
      >
        <HiOutlineX
          className="dark:text-whiteSecondary text-blackPrimary text-xl ml-auto mb-1 mr-1 cursor-pointer xl:py-2"
          onClick={() => dispatch(setSidebar())}
        />
        <div>
          <div
            onClick={() => setIsLandingOpen(() => !isLandingOpen)}
            className="flex items-center self-stretch gap-2 py-2 px-4 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-1 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary text-sm"
          >
            <HiOutlineHome className="text-lg" />
            <span className="text-sm">Landing</span>
          </div>
          {isLandingOpen && (
            <div className="ml-2">
              <NavLink
                to="/"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineHome className="text-lg" />
                <span className="text-sm">Overview v1</span>
              </NavLink>

              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineHome className="text-lg" />
                <span className="text-sm">Overview v2</span>
              </NavLink>
            </div>
          )}

          <NavLink
            to="/products"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineDevicePhoneMobile className="text-lg" />
            <span className="text-sm">Products</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Categories</span>
          </NavLink>
          <NavLink
            to="/subcategories"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Subcategories</span>
          </NavLink>
          <NavLink
            to="/segments"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTruck className="text-lg" />
            <span className="text-sm">Segments</span>
          </NavLink>
          <NavLink
            to="/brands"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Brands</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTruck className="text-lg" />
            <span className="text-sm">Orders</span>
          </NavLink>
          <NavLink
            to="/users"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineUser className="text-lg" />
            <span className="text-sm">Users</span>
          </NavLink>
          <NavLink
            to="/rules"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <MdPolicy className="text-lg" />
            <span className="text-sm">Policy</span>
          </NavLink>
          <NavLink
            to="/reviews"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineStar className="text-lg" />
            <span className="text-sm">Reviews</span>
          </NavLink>
          <div
            onClick={() => setIsAuthOpen(() => !isAuthOpen)}
            className="flex items-center self-stretch gap-2 py-2 px-4 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-1 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary text-sm"
          >
            <HiUserGroup className="text-lg" />
            <span className="text-sm">Auth</span>
          </div>
          {isAuthOpen && (
            <div className="ml-2">
              <NavLink
                to="/login"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiLogin className="text-lg" />
                <span className="text-sm">Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiUserGroup className="text-lg" />
                <span className="text-sm">Register</span>
              </NavLink>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 border-1 border-t dark:border-blackSecondary border-blackSecondary w-full">
          <NavLink
            to="/help-desk"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineInformationCircle className="text-lg" />
            <span className="text-sm">Help Desk</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
