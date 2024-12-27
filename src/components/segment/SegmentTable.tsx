import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { useSegment } from "../../hooks/segment/useSegment";
import DeleteSegment from "./DeleteSegment";

const SegmentTable: FC = () => {
  const { segment, isLoading, isError, deleteSegment } = useSegment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSegmentId, setSelectedSegmentId] = useState<number | null>(
    null
  );

  const handleDelete = async () => {
    if (selectedSegmentId !== null) {
      await deleteSegment(selectedSegmentId.toString());
      closeModal();
    }
  };

  const openModal = (segmentId: number) => {
    setSelectedSegmentId(segmentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSegmentId(null);
  };

  if (isError)
    return (
      <div className="dark:text-whiteSecondary">
        Failed to load segment data
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
      </div>
    );

  if (!segment || segment.length === 0)
    return (
      <div className="dark:text-whiteSecondary">No segments available</div>
    );

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
          {segment.map((item: any) => (
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
                    to={`/segments/${item.id}`}
                    state={{ segment: item }}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                  >
                    <HiOutlinePencil />
                  </Link>
                  <Link
                    to="/segments/1"
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineEye className="text-lg" />
                  </Link>
                  <button
                    onClick={() => openModal(item.id)}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteSegment
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this segment?"
      />
    </>
  );
};

export default SegmentTable;
