import {
  HiLogin,
  HiUserGroup,
  HiOutlineX,
  HiOutlineUser,
} from "react-icons/hi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineTag } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi";
import { MdPolicy } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FaHandshake } from "react-icons/fa";

const Sidebar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const sidebarClass: string = isSidebarOpen
    ? "sidebar-open"
    : "sidebar-closed";

  const navActiveClass: string =
    "block flex items-center self-stretch gap-2 py-2 px-3 cursor-pointer max-xl:py-1 text-sm border border-blue-500 dark:text-red-400 text-red-600 dark:bg-blackPrimary my-1 mx-1 rounded";

  const navInactiveClass: string =
    "block flex items-center self-stretch gap-2 py-2 px-3 cursor-pointer max-xl:py-1 text-sm border dark:border-white/20 border-black/20 dark:text-whiteSecondary text-blackPrimary dark:hover:bg-blackSecondary hover:bg-gray-100 my-1 mx-1 rounded";

  return (
    <div className="relative shadow-2xl dark:shadow-3xl">
      <div
        className={`w-52 min-h-[100vh] dark:bg-blackPrimary bg-whiteSecondary pt-4 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 ${sidebarClass}`}
      >
        <HiOutlineX
          className="dark:text-whiteSecondary text-blackPrimary text-xl ml-auto mb-1 mr-1 cursor-pointer xl:py-2"
          onClick={() => dispatch(setSidebar())}
        />
        <div>
          <NavLink
            to="/admin"
            end
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineDevicePhoneMobile className="text-lg" />
            <span className="text-sm">Продукты</span>
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Категории</span>
          </NavLink>
          <NavLink
            to="/admin/subcategories"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Подкатегории</span>
          </NavLink>
          <NavLink
            to="/admin/segments"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTruck className="text-lg" />
            <span className="text-sm">Сегменты</span>
          </NavLink>
          <NavLink
            to="/admin/banners"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlinePhoto className="text-lg" />
            <span className="text-sm">Баннеры</span>
          </NavLink>
          <NavLink
            to="/admin/partners"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <FaHandshake className="text-lg" />
            <span className="text-sm">Партнеры</span>
          </NavLink>
          <NavLink
            to="/admin/brands"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTag className="text-lg" />
            <span className="text-sm">Бренды</span>
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineTruck className="text-lg" />
            <span className="text-sm">Заказы</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineUser className="text-lg" />
            <span className="text-sm">Пользователи</span>
          </NavLink>
          <NavLink
            to="/admin/rules"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <MdPolicy className="text-lg" />
            <span className="text-sm">Политика</span>
          </NavLink>
        </div>

        <div className="absolute bottom-0 border-1 border-t dark:border-blackSecondary border-blackSecondary w-full">
          <div
            onClick={() => setIsAuthOpen(() => !isAuthOpen)}
            className="flex items-center self-stretch gap-2 py-2 px-3 cursor-pointer max-xl:py-1 text-sm border dark:border-white/20 border-black/20 dark:text-whiteSecondary text-blackPrimary dark:hover:bg-blackSecondary hover:bg-gray-100 my-1 mx-1 rounded"
          >
            <HiUserGroup className="text-lg" />
            <span className="text-sm">Авторизация</span>
          </div>
          {isAuthOpen && (
            <div className="ml-2">
              <NavLink
                to="/admin/login"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiLogin className="text-lg" />
                <span className="text-sm">Войти</span>
              </NavLink>
              <NavLink
                to="/admin/register"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiUserGroup className="text-lg" />
                <span className="text-sm">Регистрация</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
