import { FC } from "react";
import InputWithLabel from "../../InputWithLabel";
import SimpleInput from "../../SimpleInput";

interface NotRequiredDatasProps {
  data: {
    desc_tm?: string;
    desc_ru?: string;
    desc_en?: string;
    old_price?: number;
    discount_percentage?: number;
    discounted_price?: number;
    weight?: number;
    width?: number;
    height?: number;
    depth?: number;
    size?: string;
    color?: string;
    tags?: string;
  };
  errors: { [key: string]: string };
  onChange: (field: string, value: any) => void;
}

const EditNotRequiredDatas: FC<NotRequiredDatasProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-whiteSecondary text-blackPrimary">
        Optional Data
      </h2>
      <div className="flex flex-col gap-4">
        {/* Description in Turkmen */}
        <InputWithLabel label="Product Description (Turkmen)">
          <SimpleInput
            type="text"
            name="desc_tm"
            placeholder="Enter product description in Turkmen..."
            value={data.desc_tm || ""}
            onChange={(e) => onChange("desc_tm", e.target.value)}
          />
        </InputWithLabel>

        {/* Description in Russian */}
        <InputWithLabel label="Product Description (Russian)">
          <SimpleInput
            type="text"
            name="desc_ru"
            placeholder="Enter product description in Russian..."
            value={data.desc_ru || ""}
            onChange={(e) => onChange("desc_ru", e.target.value)}
          />
        </InputWithLabel>

        {/* Description in English */}
        <InputWithLabel label="Product Description (English)">
          <SimpleInput
            type="text"
            name="desc_en"
            placeholder="Enter product description in English..."
            value={data.desc_en || ""}
            onChange={(e) => onChange("desc_en", e.target.value)}
          />
        </InputWithLabel>

        {/* Old Price and Discount Calculation  */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Old Price Input */}
          <div>
            <InputWithLabel label="Old Price">
              <SimpleInput
                type="number"
                name="old_price"
                placeholder="Enter product old price..."
                min="0"
                step="0.01"
                value={data.old_price}
                className={errors.old_price ? "border-red-500" : ""}
                onChange={(e) => onChange("old_price", e.target.value)}
              />
            </InputWithLabel>
            {errors.old_price && (
              <p className="text-red-500 text-sm">{errors.old_price}</p>
            )}
          </div>
          {/* Discount Percentage Input */}
          <div>
            <InputWithLabel label="Discount Percentage">
              <SimpleInput
                type="number"
                name="discount_percentage"
                placeholder="Enter discount percentage..."
                min="0"
                step="0.01"
                value={data.discount_percentage}
                className={errors.discount_percentage ? "border-red-500" : ""}
                onChange={(e) =>
                  onChange("discount_percentage", e.target.value)
                }
              />
            </InputWithLabel>
            {errors.discount_percentage && (
              <p className="text-red-500 text-sm">
                {errors.discount_percentage}
              </p>
            )}
          </div>
        </div>

        {/* Discounted Price Input */}
        <InputWithLabel label="Discounted Price">
          <SimpleInput
            type="number"
            name="discounted_price"
            placeholder="Enter discounted price..."
            min="0"
            step="0.01"
            value={data.discounted_price}
            className={errors.discounted_price ? "border-red-500" : ""}
            onChange={(e) => onChange("discounted_price", e.target.value)}
          />
          {errors.discounted_price && (
            <p className="text-red-500 text-sm">{errors.discounted_price}</p>
          )}
        </InputWithLabel>
        {/* Dimensions & Size/Color/Tags Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Weight Input */}
          <div>
            <InputWithLabel label="Weight">
              <SimpleInput
                type="number"
                name="weight"
                placeholder="Enter product weight..."
                min="0"
                step="0.01"
                value={data.weight}
                className={errors.weight ? "border-red-500" : ""}
                onChange={(e) => onChange("weight", e.target.value)}
              />
            </InputWithLabel>
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}
          </div>
          {/* Width Input */}
          <div>
            <InputWithLabel label="Width">
              <SimpleInput
                type="number"
                name="width"
                placeholder="Enter product width..."
                min="0"
                step="0.01"
                value={data.width}
                className={errors.width ? "border-red-500" : ""}
                onChange={(e) => onChange("width", e.target.value)}
              />
            </InputWithLabel>
            {errors.width && (
              <p className="text-red-500 text-sm">{errors.width}</p>
            )}
          </div>
          {/* Height Input */}
          <div>
            <InputWithLabel label="Height">
              <SimpleInput
                type="number"
                name="height"
                placeholder="Enter product height..."
                min="0"
                step="0.01"
                value={data.height}
                className={errors.height ? "border-red-500" : ""}
                onChange={(e) => onChange("height", e.target.value)}
              />
            </InputWithLabel>
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height}</p>
            )}
          </div>
          {/* Depth Input */}
          <div>
            <InputWithLabel label="Depth">
              <SimpleInput
                type="number"
                name="depth"
                placeholder="Enter product depth..."
                min="0"
                step="0.01"
                value={data.depth}
                className={errors.depth ? "border-red-500" : ""}
                onChange={(e) => onChange("depth", e.target.value)}
              />
            </InputWithLabel>
            {errors.depth && (
              <p className="text-red-500 text-sm">{errors.depth}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Size Input */}
          <div>
            <InputWithLabel label="Size">
              <SimpleInput
                type="text"
                name="size"
                placeholder="Product size..."
                value={data.size || ""}
                className={errors.size ? "border-red-500" : ""}
                onChange={(e) => onChange("size", e.target.value)}
              />
            </InputWithLabel>
            {errors.size && (
              <p className="text-red-500 text-sm">{errors.size}</p>
            )}
          </div>
          {/* Color Input */}
          <div>
            <InputWithLabel label="Color">
              <SimpleInput
                type="text"
                name="color"
                placeholder="Product color..."
                value={data.color || ""}
                className={errors.color ? "border-red-500" : ""}
                onChange={(e) => onChange("color", e.target.value)}
              />
            </InputWithLabel>
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color}</p>
            )}
          </div>
          {/* Tags Input */}
          <div>
            <InputWithLabel label="Tags">
              <SimpleInput
                type="text"
                name="tags"
                placeholder="Tags..."
                value={data.tags || ""}
                className={errors.tags ? "border-red-500" : ""}
                onChange={(e) => onChange("tags", e.target.value)}
              />
            </InputWithLabel>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotRequiredDatas;
