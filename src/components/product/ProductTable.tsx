import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";

const inStockClass: string =
  "text-green-400 bg-green-400/10 flex-none rounded-full p-1";
const outOfStockClass: string =
  "text-rose-400 bg-rose-400/10 flex-none rounded-full p-1";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <table className="mt-3 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="border-b border-white/10 text-sm leading-5 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th
            scope="col"
            className="py-1 pl-2 pr-6 font-semibold sm:pl-3 lg:pl-4"
          >
            Product
          </th>
          <th scope="col" className="py-1 pl-0 pr-4 font-semibold table-cell">
            SKU
          </th>
          <th scope="col" className="py-1 pl-0 pr-4 font-semibold table-cell">
            Status
          </th>
          <th
            scope="col"
            className="py-1 pl-0 pr-4 font-semibold table-cell lg:pr-10"
          >
            Price
          </th>
          <th
            scope="col"
            className="py-1 pl-0 pr-2 text-right font-semibold table-cell sm:pr-4 lg:pr-6"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {products.map((item) => (
          <tr key={nanoid()}>
            <td className="py-2 pl-2 pr-6 sm:pl-3 lg:pl-4">
              <div className="flex items-center gap-x-2">
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].alt_text || "Product"}
                    className="h-6 w-6 rounded-full bg-gray-800"
                  />
                )}
                <div className="truncate text-sm font-medium leading-5 dark:text-whiteSecondary text-blackPrimary">
                  {item.title_en}
                </div>
              </div>
            </td>
            <td className="py-2 pl-0  table-cell pr-4">
              <div className="flex gap-x-2">
                <div className="font-mono text-sm leading-5 dark:text-whiteSecondary text-blackPrimary">
                  {item.sku}
                </div>
              </div>
            </td>
            <td className="py-2 pl-0 pr-2 text-sm leading-5 sm:pr-4 lg:pr-10">
              <div className="flex items-center gap-x-1 justify-start">
                <div
                  className={item.is_active ? inStockClass : outOfStockClass}
                >
                  <div className="h-1 w-1 rounded-full bg-current" />
                </div>
                <div className="dark:text-whiteSecondary text-blackPrimary block text-xs">
                  {item.is_active ? "In stock" : "Out of stock"}
                </div>
              </div>
            </td>
            <td className="py-2 pl-0 pr-4 text-sm leading-5 dark:text-rose-200 text-rose-600 font-medium table-cell lg:pr-10">
              {item.price}
            </td>
            <td className="py-2 pl-0 text-right text-sm leading-5 dark:text-whiteSecondary text-blackPrimary table-cell pr-4 lg:pr-6">
              <div className="flex gap-x-1 justify-end">
                <Link
                  to={`/products/${item.id}`}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-6 h-6 block flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlinePencil className="text-sm" />
                </Link>
                <Link
                  to={`/products/${item.id}`}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-6 h-6 block flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlineEye className="text-sm" />
                </Link>
                <Link
                  to="#"
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-6 h-6 block flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlineTrash className="text-sm" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductTable;
