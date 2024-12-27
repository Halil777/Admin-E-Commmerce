import React from "react";
import { InputWithLabel } from "..";
import SimpleInput from "../SimpleInput";
import Select from "react-select";
import ProductImageUpload from "./ProductImageUpload";

interface ProductFormRightProps {
  renderOptionalLabel: (label: string) => JSX.Element;
  register: any;
  errors: any;
  brands: any[];
  categories: any[];
  handleImageChange: any;
  files: any;
  setValue: any;
}

interface OptionType {
  value: any;
  label: string;
}

const ProductFormRight: React.FC<ProductFormRightProps> = ({
  renderOptionalLabel,
  register,
  errors,
  brands,
  categories,
  handleImageChange,
  files,
  setValue,
}) => {
  return (
    <div className="w-1/2 max-xl:w-full">
      <h3 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
        Categories & Brand
      </h3>
      <div className="mt-2 flex flex-col gap-3">
        <InputWithLabel
          label={renderOptionalLabel("Brand")}
          error={errors.brand_id?.message}
        >
          <Select
            name="brand_id"
            options={brands.map((brand) => ({
              value: brand.id,
              label: brand.title_en,
            }))}
            placeholder="Select brand"
            onChange={(selectedOption: OptionType | null) =>
              setValue("brand_id", selectedOption ? selectedOption.value : null)
            }
            // {...register("brand_id")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Category")}
          error={errors.categories?.message}
        >
          <Select
            name="categories"
            isMulti
            options={categories.map((category) => ({
              value: category.id,
              label: category.title_en,
            }))}
            placeholder="Select categories"
            onChange={(selectedOptions: OptionType[] | null) =>
              setValue(
                "categories",
                selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
              )
            }
          />
        </InputWithLabel>
      </div>
      <h3 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary mt-5">
        Product Images
      </h3>
      <div className="mt-2">
        <ProductImageUpload onImageChange={handleImageChange} files={files} />
      </div>
      <h3 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary mt-5">
        Delivery
      </h3>
      <div className="mt-2 flex flex-col gap-3">
        <InputWithLabel
          label={renderOptionalLabel("Weight (kg)")}
          error={errors.weight?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter weight..."
            {...register("weight")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Width (cm)")}
          error={errors.width?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter width..."
            {...register("width")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Height (cm)")}
          error={errors.height?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter height..."
            {...register("height")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Depth (cm)")}
          error={errors.depth?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter depth..."
            {...register("depth")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Size")}
          error={errors.size?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter size..."
            {...register("size")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Color")}
          error={errors.color?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter color..."
            {...register("color")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Tags")}
          error={errors.tags?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter tags comma separated..."
            {...register("tags")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Video URL")}
          error={errors.video_url?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter video url..."
            {...register("video_url")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Views")}
          error={errors.views?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter views..."
            {...register("views")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Rating")}
          error={errors.rating?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter rating..."
            {...register("rating")}
          />
        </InputWithLabel>
      </div>
    </div>
  );
};
export default ProductFormRight;
