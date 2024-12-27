import React from "react";
import { InputWithLabel } from "..";
import SimpleInput from "../SimpleInput";
import TextAreaInput from "../TextAreaInput";
import ToggleInput from "./ToggleInput";

interface ProductFormLeftProps {
  renderRequiredLabel: (label: string) => JSX.Element;
  renderOptionalLabel: (label: string) => JSX.Element;
  register: any;
  errors: any;
  control: any;
}

const ProductFormLeft: React.FC<ProductFormLeftProps> = ({
  renderRequiredLabel,
  renderOptionalLabel,
  register,
  errors,
  control,
}) => {
  return (
    <div className="w-1/2 max-xl:w-full">
      <h3 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
        Basic Information
      </h3>
      <div className="mt-2 flex flex-col gap-3">
        <InputWithLabel
          label={renderRequiredLabel("Title TM")}
          error={errors.title_tm?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter product title..."
            {...register("title_tm", { required: "This field is required" })}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderRequiredLabel("Title RU")}
          error={errors.title_ru?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter product title..."
            {...register("title_ru", { required: "This field is required" })}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderRequiredLabel("Title EN")}
          error={errors.title_en?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter product title..."
            {...register("title_en", { required: "This field is required" })}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Description TM")}
          error={errors.desc_tm?.message}
        >
          <TextAreaInput
            placeholder="Enter product description..."
            rows={3}
            cols={40}
            {...register("desc_tm")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Description RU")}
          error={errors.desc_ru?.message}
        >
          <TextAreaInput
            placeholder="Enter product description..."
            rows={3}
            cols={40}
            {...register("desc_ru")}
          />
        </InputWithLabel>
        <InputWithLabel
          label={renderOptionalLabel("Description EN")}
          error={errors.desc_en?.message}
        >
          <TextAreaInput
            placeholder="Enter product description..."
            rows={3}
            cols={40}
            {...register("desc_en")}
          />
        </InputWithLabel>

        <h3 className="text-xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary mt-5">
          Pricing & Inventory
        </h3>

        <InputWithLabel
          label={renderRequiredLabel("Base price")}
          error={errors.price?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter base price..."
            {...register("price", { required: "This field is required" })}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Old price")}
          error={errors.old_price?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter old price..."
            {...register("old_price")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Discount percentage")}
          error={errors.discount_percentage?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter discount percentage..."
            {...register("discount_percentage")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Discounted price")}
          error={errors.discounted_price?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter discounted price..."
            {...register("discounted_price")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderRequiredLabel("Stock")}
          error={errors.stock?.message}
        >
          <SimpleInput
            type="number"
            placeholder="Enter product stock..."
            {...register("stock", { required: "This field is required" })}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("SKU")}
          error={errors.sku?.message}
        >
          <SimpleInput
            type="text"
            placeholder="Enter product SKU..."
            {...register("sku")}
          />
        </InputWithLabel>

        <InputWithLabel
          label={renderOptionalLabel("Status")}
          error={errors.is_active?.message}
        >
          <ToggleInput control={control} name="is_active" />
        </InputWithLabel>
      </div>
    </div>
  );
};
export default ProductFormLeft;
