import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useProduct } from "../../hooks/product/useProduct";
import DeleteProduct from "./DeleteProduct";
import TableSkeleton from "../common/TableSkeleton";

const ProductTable = () => {
  const { products, isLoading, isError, deleteProduct } = useProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

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

  if (isLoading) return <TableSkeleton />;

  if (isError)
    return (
      <div className="dark:text-whiteSecondary">Failed to load products.</div>
    );

  return (
    <>
      <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-2/12" />
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
              Product
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Stock
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Price
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Status
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Category
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Brand
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
          {Array.isArray(products) && products.length > 0 ? (
            products.map((item: any) => (
              <tr key={item.id}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
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
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.stock}
                </td>
                <td className="py-4 pl-0 pr-8 text-rose-600 font-medium table-cell">
                  {item.price}
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  <div className="flex items-center gap-x-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.is_active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span>{item.is_active ? "In stock" : "Out of stock"}</span>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.category?.title_en}
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.brand?.title_en}
                </td>
                <td className="py-4 pl-0 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                  <div className="flex gap-x-1 justify-end">
                    <Link
                      to={`/admin/products/${item.id}`}
                      state={{ product: item }}
                      className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                    >
                      <HiOutlinePencil />
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
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product?"
      />
    </>
  );
};

export default ProductTable;
