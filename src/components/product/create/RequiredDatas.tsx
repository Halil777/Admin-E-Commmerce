import { FC } from "react";
import InputWithLabel from "../../InputWithLabel";
import SimpleInput from "../../SimpleInput";

interface RequiredDatasProps {
  data: {
    title_tm: string;
    title_ru: string;
    title_en: string;
    stock: number;
    price: number;
  };
  errors: { [key: string]: string };

  onChange: (field: string, value: any) => void;
}

const RequiredDatas: FC<RequiredDatasProps> = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-whiteSecondary text-blackPrimary">
        Required Data
      </h2>

      <div className="flex flex-col gap-4">
        {/* Title in Turkmen */}
        <InputWithLabel label="Product Title (Turkmen)">
          <SimpleInput
            type="text"
            name="title_tm"
            placeholder="Enter product title in Turkmen..."
            value={data.title_tm}
            onChange={(e) => onChange("title_tm", e.target.value)}
          />
        </InputWithLabel>

        {/* Title in Russian */}
        <InputWithLabel label="Product Title (Russian)">
          <SimpleInput
            type="text"
            name="title_ru"
            placeholder="Enter product title in Russian..."
            value={data.title_ru}
            onChange={(e) => onChange("title_ru", e.target.value)}
          />
        </InputWithLabel>

        {/* Title in English */}
        <InputWithLabel label="Product Title (English)">
          <SimpleInput
            type="text"
            name="title_en"
            placeholder="Enter product title in English..."
            value={data.title_en}
            onChange={(e) => onChange("title_en", e.target.value)}
          />
        </InputWithLabel>

        {/* Stock and Price (Responsive Grid) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Price Input */}
          <div>
            <InputWithLabel label="Price">
              <SimpleInput
                type="number"
                name="price"
                placeholder="Enter product price..."
                min="0"
                step="0.01"
                className={errors.price ? "border-red-500" : ""}
                value={data.price}
                onChange={(e) => onChange("price", e.target.value)}
              />
            </InputWithLabel>
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
          {/* Stock Input */}
          <div>
            <InputWithLabel label="Stock">
              <SimpleInput
                type="number"
                name="stock"
                placeholder="Enter product stock..."
                min="0"
                className={errors.stock ? "border-red-500" : ""}
                value={data.stock}
                onChange={(e) => onChange("stock", e.target.value)}
              />
            </InputWithLabel>
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredDatas;
