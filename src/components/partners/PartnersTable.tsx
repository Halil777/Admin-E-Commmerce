import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";
import { usePartner } from "../../hooks/partner/usePartner";
import DeletePartner from "./DeletePartner";
import TableSkeleton from "../common/TableSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PartnersTable = () => {
  const { partners, isLoading, isError, deletePartner } = usePartner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const openModal = (partnerId: number) => {
    setSelectedPartnerId(partnerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartnerId(null);
  };

  const handleDelete = async () => {
    if (selectedPartnerId !== null) {
      try {
        await deletePartner(selectedPartnerId);
        closeModal();
      } catch (error) {
        console.error("Failed to delete partner:", error);
      }
    }
  };
  const filteredPartners = useMemo(() => {
    if (!searchTerm) {
      return partners;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return partners?.filter(
      (item: any) =>
        item.title_tm.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.title_en.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [partners, searchTerm]);

  if (isError)
    return (
      <div className="dark:text-whiteSecondary">
        Failed to load partner data
      </div>
    );

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="relative my-4">
        <input
          type="text"
          placeholder="Search partners..."
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
          <col className="lg:w-4/12" />
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
              className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredPartners) && filteredPartners.length > 0 ? (
            filteredPartners.map((item: any) => (
              <tr key={item.id}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    {item.imageUrl ? (
                      <LazyLoadImage
                        src={item.imageUrl}
                        alt={item.title_tm}
                        className="w-22 h-10 "
                        effect="blur"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                    <div className="truncate text-xs font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                      {item.title_tm.slice(0, 20)}...
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 table-cell pr-8">
                  <div className="flex gap-x-3">
                    <div className="text-xs leading-6 dark:text-whiteSecondary text-blackPrimary">
                      {item.title_en.slice(0, 20)}...
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-4 text-xs leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center gap-x-2 justify-start">
                    <div className="dark:text-whiteSecondary text-blackPrimary block">
                      {item.title_ru.slice(0, 20)}...
                    </div>
                  </div>
                </td>

                <td className="py-4 pl-0 text-right text-xs leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                  <div className="flex gap-x-1 justify-end">
                    <Link
                      to={`/admin/subcategories/${item.id}`}
                      state={{ category: item }}
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
              <td colSpan={5} className="text-center py-4">
                No partners available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!partners?.length && (
        <div className="bg-blue-200 dark:bg-dark rounded center-col my-2 p-2 h-20">
          <p>Ничего не нашлось.</p>
        </div>
      )}

      <DeletePartner
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this partner?"
      />
    </>
  );
};

export default PartnersTable;
