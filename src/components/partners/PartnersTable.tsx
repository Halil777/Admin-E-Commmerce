import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { usePartner } from "../../hooks/partner/usePartner"; // Changed import
import DeletePartner from "./DeletePartner"; // Changed import
import TableSkeleton from "../common/TableSkeleton";

const PartnersTable = () => {
  const { partners, isLoading, isError, deletePartner } = usePartner(); // Changed hook and key
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null
  ); // Changed state

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
        console.error("Failed to delete partner:", error); // Changed message
      }
    }
  };

  if (isError)
    return (
      <div className="dark:text-whiteSecondary">
        Failed to load partner data
      </div> // Changed message
    );

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
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
              Image
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Name TM
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Name EN
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
          {Array.isArray(partners) && partners.length > 0 ? (
            partners.map((item: any) => (
              <tr key={item.id}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`Partner ${item.id}`}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Image</span>
                    )}
                  </div>
                </td>
                <td className="py-4 pl-0 table-cell pr-8">
                  <div className="flex gap-x-3">
                    <div className="text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
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
                <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
                  {item.desc_tm}
                </td>
                <td className="py-4 pl-0 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                  <div className="flex gap-x-1 justify-end">
                    <Link
                      to={`/admin/partners/${item.id}`}
                      state={{ partner: item }}
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

      <DeletePartner
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this partner?" // Changed message
      />
    </>
  );
};

export default PartnersTable;
