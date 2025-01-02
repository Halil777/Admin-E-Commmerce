import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { nanoid } from "nanoid";
import { useProduct } from "../../hooks/product/useProduct";
import DeleteProduct from "./DeleteProduct";

const ProductTable = () => {
  const { products, isLoading, isError, deleteProduct } = useProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    number | null | string
  >(null);

  const openModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    if (selectedProductId !== null) {
      await deleteProduct(selectedProductId.toString());
      closeModal();
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <table className="mt-3 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <thead className="border-b border-white/10 text-sm leading-5 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th className="py-1 pl-2 pr-6 font-semibold sm:pl-3 lg:pl-4">
              Product
            </th>
            <th className="py-1 pl-0 pr-4 font-semibold table-cell">Stock</th>
            <th className="py-1 pl-0 pr-4 font-semibold table-cell">Price</th>
            <th className="py-1 pl-0 pr-4 font-semibold table-cell">Status</th>
            <th className="py-1 pl-0 pr-4 font-semibold table-cell">
              Category
            </th>
            <th className="py-1 pl-0 pr-4 font-semibold table-cell">Brand</th>
            <th className="py-1 pl-0 pr-2 text-right font-semibold table-cell sm:pr-4 lg:pr-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((item: any) => (
            <tr key={nanoid()}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8 cursor-pointer">
                <div className="flex items-center gap-x-4">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]} // Assuming you want to display the first image
                      alt={item.title_tm}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div> // Placeholder if no image
                  )}
                  <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {item.title_tm}
                  </div>
                </div>
              </td>
              <td className="py-2 pl-0 table-cell pr-4">{item.stock}</td>
              <td className="py-2 pl-0 pr-4 text-sm leading-5 dark:text-rose-200 text-rose-600 font-medium table-cell lg:pr-10">
                {item.price}
              </td>
              <td className="py-2 pl-0 pr-2 text-sm leading-5 sm:pr-4 lg:pr-10">
                <div className="flex items-center gap-x-1">
                  <div
                    className={`${
                      item.is_active
                        ? "text-green-400 bg-green-400/10"
                        : "text-rose-400 bg-rose-400/10"
                    } flex-none rounded-full p-1`}
                  >
                    <div className="h-1 w-1 rounded-full bg-current" />
                  </div>
                  <div className="dark:text-whiteSecondary text-blackPrimary block text-xs">
                    {item.is_active ? "In stock" : "Out of stock"}
                  </div>
                </div>
              </td>
              <td className="py-2 pl-0 table-cell pr-4">
                {item.category?.title_en}
              </td>
              <td className="py-2 pl-0 table-cell pr-4">
                {item.brand?.title_en}
              </td>
              <td className="py-2 pl-0 text-right text-sm leading-5 dark:text-whiteSecondary text-blackPrimary table-cell pr-4 lg:pr-6">
                <div className="flex gap-x-1 justify-end">
                  <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-6 h-6 flex justify-center items-center cursor-pointer hover:border-gray-400">
                    <HiOutlinePencil className="text-sm" />
                  </button>
                  <button
                    onClick={() => openModal(item.id)}
                    className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-6 h-6 flex justify-center items-center cursor-pointer hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно для удаления */}
      <DeleteProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this Product?"
      />
    </>
  );
};

export default ProductTable;
