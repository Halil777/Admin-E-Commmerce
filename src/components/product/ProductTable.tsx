import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";
import { useProduct } from "../../hooks/product/useProduct";
import DeleteProduct from "./DeleteProduct";
import TableSkeleton from "../common/TableSkeleton";
import { useCategories } from "../../hooks/category/useCategory";
import { useSubcategories } from "../../hooks/subcategory/useSubcategories";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductTable = () => {
  const { products, isLoading, isError, deleteProduct } = useProduct();
  const { categories } = useCategories();
  const { subcategories } = useSubcategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [productWithNames, setProductWithNames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return productWithNames;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return productWithNames?.filter(
      (item: any) =>
        item.title_tm.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.categoryName.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.subcategoryName.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.brand?.title_en?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [productWithNames, searchTerm]);

  useEffect(() => {
    if (products && categories && subcategories) {
      const updatedProducts = products.map((product: any) => {
        const category = categories.find(
          (cat: any) => cat.id === product.category_id
        );
        const subcategory = subcategories.find(
          (sub: any) => sub.id === product.subcategory
        );

        return {
          ...product,
          categoryName: category ? category.title_en : "N/A",
          subcategoryName: subcategory ? subcategory.title_en : "N/A",
        };
      });
      setProductWithNames(updatedProducts);
    }
  }, [products, categories, subcategories]);

  if (isLoading) return <TableSkeleton />;

  if (isError)
    return (
      <div className="dark:text-whiteSecondary">Failed to load products.</div>
    );

  return (
    <>
      <div className="relative my-4">
        <input
          type="text"
          placeholder="Search products..."
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
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-2/12" />
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
              Product
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Stock
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Price
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
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((item: any) => (
              <tr key={item.id} className="cursor:pointer">
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    {item.images?.[0] ? (
                      <LazyLoadImage
                        src={item.images[0]}
                        alt={item.title_tm}
                        className="w-10 h-10"
                        effect="blur"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Image</span>
                    )}
                    <div className="truncate text-xs font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                      {item.title_tm.slice(0, 25)}...
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.stock}
                </td>
                <td className="py-4 pl-0 pr-8 text-rose-600 font-medium table-cell">
                  {item.price}m
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.categoryName.slice(0, 15)}...
                </td>
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell">
                  {item.brand?.title_en.slice(0, 10)}...
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
              <td colSpan={6} className="text-center py-4">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!products?.length && (
        <div className="bg-blue-200 dark:bg-dark rounded center-col my-2 p-2 h-20">
          <p>Ничего не нашлось.</p>
        </div>
      )}
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
