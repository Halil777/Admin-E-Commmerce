import { FC } from "react";
import { useCategories } from "../../../hooks/category/useCategory";
import { useSubcategories } from "../../../hooks/subcategory/useSubcategories";
import { useSegment } from "../../../hooks/segment/useSegment";
import { useBrand } from "../../../hooks/brand/useBrand";

interface SelectCategoriesProps {
  data: {
    category: string;
    subcategory: string;
    segment: string;
    brand: string;
  };
  onChange: (field: string, value: any) => void;
}

const SelectCategories: FC<SelectCategoriesProps> = ({ data, onChange }) => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { subcategories, isLoading: isSubcategoriesLoading } =
    useSubcategories();
  const { segments, isLoading: isSegmentLoading } = useSegment();
  const { brands, isLoading: isBrandsLoading } = useBrand();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {/* Category Select */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <div className="relative mt-1">
          <select
            id="category"
            name="category"
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            value={data.category}
            onChange={(e) => onChange("category", e.target.value)}
          >
            {isCategoriesLoading ? (
              <option>Loading categories...</option>
            ) : (
              <>
                <option value="">Select a category</option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.title_en}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* Subcategory Select */}
      <div>
        <label
          htmlFor="subcategory"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Subcategory
        </label>
        <div className="relative mt-1">
          <select
            id="subcategory"
            name="subcategory"
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            value={data.subcategory}
            onChange={(e) => onChange("subcategory", e.target.value)}
          >
            {isSubcategoriesLoading ? (
              <option>Loading subcategories...</option>
            ) : (
              <>
                <option value="">Select a subcategory</option>
                {subcategories?.map((subcategory: any) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.title_en}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* Segment Select */}
      <div>
        <label
          htmlFor="segment"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Segment
        </label>
        <div className="relative mt-1">
          <select
            id="segment"
            name="segment"
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            value={data.segment}
            onChange={(e) => onChange("segment", e.target.value)}
          >
            {isSegmentLoading ? (
              <option>Loading segments...</option>
            ) : (
              <>
                <option value="">Select a segment</option>
                {segments?.map((seg: any) => (
                  <option key={seg.id} value={seg.id}>
                    {seg.title_en}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* Brand Select */}
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Brand
        </label>
        <div className="relative mt-1">
          <select
            id="brand"
            name="brand"
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            value={data.brand}
            onChange={(e) => onChange("brand", e.target.value)}
          >
            {isBrandsLoading ? (
              <option>Loading brands...</option>
            ) : (
              <>
                <option value="">Select a brand</option>
                {brands?.map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.title_en}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectCategories;
