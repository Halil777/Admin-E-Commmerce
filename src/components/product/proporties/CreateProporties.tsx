import { FC, useState, useEffect } from "react";
import { BASE_URL } from "../../../api/base";

interface ProportiesData {
  title_tm: string;
  title_en: string;
  title_ru: string;
  value_tm: string;
  value_en: string;
  value_ru: string;
  type: "color" | "plain";
  product_id: number;
}

interface CreateProportiesProps {
  productId: number;
}
const CreateProporties: FC<CreateProportiesProps> = ({ productId }) => {
  const [properties, setProperties] = useState<ProportiesData[]>([
    {
      title_tm: "",
      title_en: "",
      title_ru: "",
      value_tm: "",
      value_en: "",
      value_ru: "",
      type: "color", // default value
      product_id: productId,
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Update product_id when productId prop changes
    setProperties((prevProperties) =>
      prevProperties.map((property) => ({ ...property, product_id: productId }))
    );
  }, [productId]);

  const handlePropertyChange = (
    index: number,
    field: keyof ProportiesData,
    value: any
  ) => {
    setProperties((prevProperties) =>
      prevProperties.map((property, i) =>
        i === index ? { ...property, [field]: value } : property
      )
    );
    // Clear error for this field if it exists
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleAddProperty = () => {
    setProperties((prevProperties) => [
      ...prevProperties,
      {
        title_tm: "",
        title_en: "",
        title_ru: "",
        value_tm: "",
        value_en: "",
        value_ru: "",
        type: "color",
        product_id: productId,
      },
    ]);
  };

  const handleRemoveProperty = (index: number) => {
    setProperties((prevProperties) =>
      prevProperties.filter((_, i) => i !== index)
    );
  };

  const createProperties = async (propertiesData: ProportiesData[]) => {
    try {
      for (const property of propertiesData) {
        const response = await fetch(`${BASE_URL}properties`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        });

        if (!response.ok) {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            if (errorData.message) {
              alert(errorData.message.join(", "));
            }
          } catch (parseError) {
            alert(errorText);
          }
          throw new Error(`Failed to create property: ${errorText}`);
        }
        const data = await response.json();
        console.log("Property created successfully:", data);
      }

      alert("Properties created successfully!");
    } catch (error) {
      console.error("Error creating properties", error);
    }
  };

  const handleSubmit = async () => {
    if (!productId) {
      alert("Product ID is not available yet!");
      return;
    }
    createProperties(properties);
  };
  return (
    <div className="mt-6 p-6 bg-white rounded shadow-md dark:bg-blackPrimary">
      <h2 className="text-xl font-semibold dark:text-whiteSecondary text-blackPrimary mb-4">
        Create Properties
      </h2>
      {properties.map((property, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-4 mb-4 last:border-b-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Title TM */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title TM
              </label>
              <input
                type="text"
                value={property.title_tm}
                onChange={(e) =>
                  handlePropertyChange(index, "title_tm", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>

            {/* Title EN */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title EN
              </label>
              <input
                type="text"
                value={property.title_en}
                onChange={(e) =>
                  handlePropertyChange(index, "title_en", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            {/* Title RU */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title RU
              </label>
              <input
                type="text"
                value={property.title_ru}
                onChange={(e) =>
                  handlePropertyChange(index, "title_ru", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            {/* Value TM */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Value TM
              </label>
              <input
                type="text"
                value={property.value_tm}
                onChange={(e) =>
                  handlePropertyChange(index, "value_tm", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>

            {/* Value EN */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Value EN
              </label>
              <input
                type="text"
                value={property.value_en}
                onChange={(e) =>
                  handlePropertyChange(index, "value_en", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            {/* Value RU */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Value RU
              </label>
              <input
                type="text"
                value={property.value_ru}
                onChange={(e) =>
                  handlePropertyChange(index, "value_ru", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                value={property.type}
                onChange={(e) =>
                  handlePropertyChange(
                    index,
                    "type",
                    e.target.value as "color" | "plain"
                  )
                }
                className="mt-1 p-2 w-full border rounded dark:bg-gray-800 dark:text-white focus:ring focus:ring-blue-200 focus:border-blue-400"
              >
                <option value="color">Color</option>
                <option value="plain">Plain</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => handleRemoveProperty(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddProperty}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Property
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Properties
        </button>
      </div>
    </div>
  );
};

export default CreateProporties;
