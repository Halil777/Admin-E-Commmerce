const TableSkeleton = () => {
  return (
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
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
          </th>
          <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
          </th>
          <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
          </th>
          <th
            scope="col"
            className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20"
          >
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
          </th>
          <th
            scope="col"
            className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
          >
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {[...Array(5)].map(
          (
            _,
            i // Create 5 rows as an example
          ) => (
            <tr key={i}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="bg-gray-300 dark:bg-gray-700 w-10 h-10 rounded-full animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-2/4 rounded-md animate-pulse"></div>
                </div>
              </td>
              <td className="py-4 pl-0 table-cell pr-8">
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded-md animate-pulse"></div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-2/4 rounded-md animate-pulse"></div>
              </td>
              <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-3/4 rounded-md animate-pulse"></div>
              </td>
              <td className="py-4 pl-0 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                <div className="flex gap-x-1 justify-end">
                  <div className="bg-gray-300 dark:bg-gray-700 w-8 h-8 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 w-8 h-8 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 w-8 h-8 rounded-md animate-pulse"></div>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
