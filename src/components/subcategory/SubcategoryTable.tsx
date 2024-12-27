import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { useSubcategories } from "../../hooks/subcategory/useSubcategories";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { Empty } from "./Empty";
import DeleteSubcategory from "./DeleteSubcategory";

const SubcategoryTable: FC = () => {
  const { subcategories, isLoading, isError, deleteSubcategory } =
    useSubcategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | null
  >(null);

  const handleDelete = async () => {
    if (selectedSubcategoryId !== null) {
      await deleteSubcategory(selectedSubcategoryId.toString());
      closeModal();
    }
  };

  const openModal = (subcategoryId: number) => {
    setSelectedSubcategoryId(subcategoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubcategoryId(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (!subcategories || subcategories.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b dark:border-white/10 border-black/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Name TM
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Name EN
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Name RU
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20"
            >
              Description
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {subcategories.map((item: any) => (
            <tr key={item.id}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title_tm}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                  )}
                  <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {item.title_tm}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 table-cell pr-8">
                <div className="flex gap-x-3">
                  <div className="text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {item.title_en}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center gap-x-2 justify-start">
                  <div className="dark:text-whiteSecondary text-blackPrimary block">
                    {item.title_ru}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
                {item.desc_tm}
              </td>
              <td className="py-4 pl-0 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                <div className="flex gap-x-1 justify-end">
                  <Link
                    to={`/subcategories/${item.id}`}
                    state={{ subcategory: item }}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                  >
                    <HiOutlinePencil />
                  </Link>
                  <Link
                    to="/subcategories/1"
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineEye className="text-lg" />
                  </Link>
                  <button
                    onClick={() => openModal(item.id)}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteSubcategory
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this subcategory?"
      />
    </>
  );
};

export default SubcategoryTable;
