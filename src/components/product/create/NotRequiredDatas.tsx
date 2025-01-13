import { FC, useState } from "react";
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
  };
  errors: { [key: string]: string };
  onChange: (field: string, value: any) => void;
}

const NotRequiredDatas: FC<NotRequiredDatasProps> = ({
  data,
  onChange,
  errors,
}) => {
  const [showDatas, setShowDatas] = useState(false);

  const handleToggle = () => {
    setShowDatas(!showDatas);
  };

  const handleInputChange = (field: string, value: any) => {
    let updatedValue = value;

    if (
      field === "old_price" ||
      field === "discount_percentage" ||
      field === "discounted_price"
    ) {
      updatedValue = value ? parseFloat(value) : 0;
      if (isNaN(updatedValue)) {
        onChange(field, 0);
        // Create error message
        const errorMessage = `${field.replace(/_/g, " ")} must be a number`;
        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
        return;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        onChange(field, updatedValue);

        return;
      }
    }
    onChange(field, value);
  };

  const setErrors = (
    updater: (prevState: { [key: string]: string }) => { [key: string]: string }
  ) => {
    // Call the setErrors function passed from parent.
    // This assumes your parent `CreateProduct` component passes the correct error update function
    // to NotRequiredDatas.
    // Here, you'll make changes to the `errors` state.
  };
  return (
    <div>
      <div
        onClick={handleToggle}
        className="flex items:center justify-between cursor:pointer"
      >
        <h2 className="text-2xl font-bold mb-6 dark:text-whiteSecondary text-blackPrimary">
          Optional Data
        </h2>

        {showDatas ? <h2>-</h2> : <h1>+</h1>}
      </div>
      {showDatas && (
        <>
          <div className="flex flex-col gap-4">
            {/* Description in Turkmen */}
            <InputWithLabel label="Product Description (Turkmen)">
              <SimpleInput
                type="text"
                name="desc_tm"
                placeholder="Enter product description in Turkmen..."
                value={data.desc_tm || ""}
                onChange={(e) => handleInputChange("desc_tm", e.target.value)}
              />
            </InputWithLabel>

            {/* Description in Russian */}
            <InputWithLabel label="Product Description (Russian)">
              <SimpleInput
                type="text"
                name="desc_ru"
                placeholder="Enter product description in Russian..."
                value={data.desc_ru || ""}
                onChange={(e) => handleInputChange("desc_ru", e.target.value)}
              />
            </InputWithLabel>

            {/* Description in English */}
            <InputWithLabel label="Product Description (English)">
              <SimpleInput
                type="text"
                name="desc_en"
                placeholder="Enter product description in English..."
                value={data.desc_en || ""}
                onChange={(e) => handleInputChange("desc_en", e.target.value)}
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
                    className={errors.old_price ? "border-red-500" : ""}
                    value={data.old_price}
                    onChange={(e) =>
                      handleInputChange("old_price", e.target.value)
                    }
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
                    className={
                      errors.discount_percentage ? "border-red-500" : ""
                    }
                    value={data.discount_percentage}
                    onChange={(e) =>
                      handleInputChange("discount_percentage", e.target.value)
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
                className={errors.discounted_price ? "border-red-500" : ""}
                value={data.discounted_price}
                onChange={(e) =>
                  handleInputChange("discounted_price", e.target.value)
                }
              />
              {errors.discounted_price && (
                <p className="text-red-500 text-sm">
                  {errors.discounted_price}
                </p>
              )}
            </InputWithLabel>
          </div>
        </>
      )}
    </div>
  );
};

export default NotRequiredDatas;
