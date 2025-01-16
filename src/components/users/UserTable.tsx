import { useEffect, useState, useMemo } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import {
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";
import { observer } from "mobx-react-lite";
import UserViewModel from "../../store/users/UserViewModel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const userViewModel = new UserViewModel();

const UserTable = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    userViewModel.fetchUsers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return userViewModel.users;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return userViewModel.users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [userViewModel.users, searchTerm]);

  if (userViewModel.loading) {
    return <p>Loading users...</p>;
  }

  if (userViewModel.error) {
    return <p>Error: {userViewModel.error}</p>;
  }

  return (
    <>
      <div className="relative my-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 pl-3 dark:bg-blackSecondary bg-gray-200 dark:text-whiteSecondary text-blackPrimary border dark:border-white/10 border-black/10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <HiOutlineSearch className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <table className="mt-6 w-full border dark:border-white/10 border-black/10  whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-3/12" />
          <col className="lg:w-3/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b dark:border-white/10 border-black/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Email address
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Phone Number
            </th>
            <th className="text-xs md:text-sm">Created At</th>
            <th className="text-xs md:text-sm">isNotify</th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr
                key={nanoid()}
                className="border-b dark:text-whiteSecondary text-blackPrimary border-support-200 cursor-pointer transition hover:bg-white dark:hover:bg-dark"
              >
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    {user.profileImage ? (
                      <LazyLoadImage
                        src={user.profileImage}
                        alt={user.lastName}
                        className="w-12 h-10"
                        effect="blur"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Image</span>
                    )}
                    <div className="truncate text-xs font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                      {`${user.lastName} ${user.firstName}`}
                    </div>
                  </div>
                </td>
                <td className="text-left text-xs md:text-xs">{user.email}</td>
                <td className="text-left text-xs md:text-xs">
                  {user.phoneNumber}
                </td>
                <td className="text-left text-xs md:text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="text-left text-xs md:text-xs">
                  {user.is_notify ? "Yes" : "No"}
                </td>
                <td className="text-right text-xs md:text-sm">
                  <div className="flex gap-2 justify-end">
                    <Link
                      to={"/admin/users/"}
                      className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                    >
                      <HiOutlinePencil className="text-lg" />
                    </Link>
                    <button
                      onClick={() => userViewModel.deleteUser(user.id)}
                      className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!userViewModel.users?.length && (
        <div className="bg-blue-200 dark:bg-dark rounded center-col my-2 p-2 h-20">
          <p>Ничего не нашлось.</p>
        </div>
      )}
    </>
  );
});

export default UserTable;
