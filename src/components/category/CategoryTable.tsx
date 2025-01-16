import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useCategories } from "../../hooks/category/useCategory";
import DeleteCategory from "./DeleteCategory";
import TableSkeleton from "../common/TableSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryTable = () => {
  const { categories, isLoading, isError, deleteCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const openModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDelete = async () => {
    if (selectedCategoryId !== null) {
      await deleteCategory(selectedCategoryId.toString());
      closeModal();
    }
  };

  if (isError) {
    return <div className="text-error">Ошибка загрузки категорий</div>;
  }

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="table-fixed min-w-[600px] w-full">
          <thead>
            <tr className="border-b border-support-200">
              <th className="w-20 text-xs md:text-sm">Картина</th>
              <th className="text-xs md:text-sm">Имя (ру.)</th>
              <th className="text-xs md:text-sm">Имя (ткм.)</th>
              <th className="text-xs md:text-sm">Имя (en.)</th>
              <th className="text-xs md:text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length ? (
              categories.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-support-200 cursor-pointer transition hover:bg-white dark:hover:bg-dark"
                >
                  <td className="bg-white dark:bg-dark rounded center-col p-1 h-12 w-16">
                    <LazyLoadImage
                      alt={item.title_tm}
                      src={item.imageUrl}
                      className="object-contain h-full w-auto"
                    />
                  </td>
                  <td className="text-left text-xs md:text-sm">
                    {item.title_ru}
                  </td>
                  <td className="text-left text-xs md:text-sm">
                    {item.title_tm}
                  </td>
                  <td className="text-left text-xs md:text-sm">
                    {item.title_en}
                  </td>
                  <td className="text-right text-xs md:text-sm">
                    <div className="flex gap-2 justify-end">
                      <Link
                        to={`/admin/categories/${item.id}`}
                        state={{ category: item }}
                        className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                      >
                        <HiOutlinePencil />
                      </Link>
                      <button
                        onClick={() => openModal(item.id)}
                        className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Нет доступных категорий
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!categories?.length && (
          <div className="bg-blue-200 dark:bg-dark rounded center-col my-2 p-2 h-20">
            <p>Ничего не нашлось.</p>
          </div>
        )}
      </div>

      <DeleteCategory
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Вы уверены, что хотите удалить эту категорию?"
      />
    </>
  );
};

export default CategoryTable;
