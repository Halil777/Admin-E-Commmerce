import { FC, useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import { BASE_URL } from "../../api/base";

interface Field {
  label_tm: string;
  label_ru: string;
  label_en: string;
  type: "text" | "number" | "select";
  options?: string[];
}

interface Property {
  id?: number;
  fields: Field[];
  values: { [key: string]: string | number };
  isNew?: boolean;
}

const AddProporties: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state as { product: any };
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<Property>({
    fields: [],
    values: {},
    isNew: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newField, setNewField] = useState<Field>({
    label_tm: "",
    label_ru: "",
    label_en: "",
    type: "text",
    options: [],
  });
  useEffect(() => {
    if (product && product.properties) {
      setProperties(
        product.properties.map((prop: any) => {
          const values: { [key: string]: string } = {};
          prop.values = values;
          return {
            ...prop,
            values: {
              title_tm: prop.title_tm,
              title_ru: prop.title_ru,
              title_en: prop.title_en,
              value_tm: prop.value_tm,
              value_ru: prop.value_ru,
              value_en: prop.value_en,
              type: prop.type,
            },
            fields: [
              {
                label_tm: "Title TM",
                label_ru: "Title RU",
                label_en: "Title EN",
                type: "text",
              },
              {
                label_tm: "Value TM",
                label_ru: "Value RU",
                label_en: "Value EN",
                type: "text",
              },
              {
                label_tm: "Type",
                label_ru: "Type",
                label_en: "Type",
                type: "select",
                options: ["plain", "color"],
              },
            ],
            isNew: false,
          };
        })
      );
    }
  }, [product]);

  const handleInputChange = (index: number, fieldKey: string, value: any) => {
    setProperties((prev) =>
      prev.map((prop, i) => {
        if (i === index) {
          return {
            ...prop,
            values: { ...prop.values, [fieldKey]: value },
          };
        }
        return prop;
      })
    );
  };

  const handleNewFieldChange = (field: string, value: any) => {
    setNewField((prev) => ({ ...prev, [field]: value }));
  };
  // Corrected handleNewPropertyChange - used to be not used. Now it sets the 'values' field of newProperty.
  const handleNewPropertyChange = (field: string, value: any) => {
    setNewProperty((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }));
  };

  const addField = () => {
    if (
      !newField.label_tm ||
      !newField.label_ru ||
      !newField.label_en ||
      !newField.type
    ) {
      setErrors({ field: "All new field fields are required" });
      return;
    }

    setNewProperty((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
    setNewField({
      label_tm: "",
      label_ru: "",
      label_en: "",
      type: "text",
      options: [],
    });
    setErrors({});
  };
  const addProperty = () => {
    if (newProperty.fields.length === 0) {
      setErrors({ property: "You should add at least one field" });
      return;
    }
    setProperties((prev) => [...prev, newProperty]);
    setNewProperty({
      fields: [],
      values: {},
      isNew: true,
    });
    setErrors({});
  };

  const renderInput = (index: number, field: Field, value: string | number) => {
    const commonProps = {
      className:
        "mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary",
      onChange: (e: any) =>
        handleInputChange(index, getFieldName(field), e.target.value),
      value: value || "",
    };

    switch (field.type) {
      case "text":
        return <input type="text" {...commonProps} />;
      case "number":
        return <input type="number" {...commonProps} />;
      case "select":
        return (
          <select {...commonProps}>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const getFieldName = (field: Field) => {
    return field.label_en.toLowerCase().replace(/ /g, "_");
  };

  const handleSubmit = async () => {
    const propertiesToSave = properties.map((prop) => {
      const values: { [key: string]: string | number } = {};
      prop.fields.forEach((field) => {
        const fieldName = getFieldName(field);
        values[fieldName] = prop.values[fieldName];
      });

      // Removed restValues, and instead extract specific values from prop.values
      const {
        title_tm,
        title_ru,
        title_en,
        value_tm,
        value_ru,
        value_en,
        type,
      } = prop.values;

      return {
        title_tm: title_tm as string,
        title_ru: title_ru as string,
        title_en: title_en as string,
        value_tm: value_tm as string,
        value_ru: value_ru as string,
        value_en: value_en as string,
        type: type as string,
        product_id: Number(productId),
        id: prop.id,
      };
    });

    console.log("Sending properties data:", propertiesToSave);

    try {
      const response = await fetch(`${BASE_URL}properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertiesToSave),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Property update failed:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            alert(errorData.message.join(", "));
          }
        } catch (parseError) {
          alert(errorText);
        }
        return; // Stop execution if there's an error
      }
      const data = await response.json();
      console.log("Properties updated successfully:", data);
      navigate(`/products`);
    } catch (error) {
      console.error("Failed to send properties data", error);
    }
  };

  return (
    <div className="flex h-auto min-h-screen dark:bg-blackPrimary bg-whiteSecondary border-t border-blackSecondary">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold dark:text-whiteSecondary text-blackPrimary mb-6">
          Add Properties for Product: {product?.title_tm}
        </h2>
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSubmit}
            className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
          >
            <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
            <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
              Save
            </span>
          </button>
        </div>
        {/* Display existing properties */}
        {properties?.map((property, index) => (
          <div
            key={index}
            className="mb-4 p-4 border rounded shadow dark:bg-blackPrimary bg-white"
          >
            <h3 className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary mb-2">
              Property {index + 1}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {property.fields.map((field) => (
                <div key={field.label_en}>
                  <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                    {field.label_en}
                  </label>
                  {renderInput(
                    index,
                    field,
                    property.values[getFieldName(field)]
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 border rounded shadow dark:bg-blackPrimary bg-white">
          <h3 className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary mb-2">
            Add New Property
          </h3>
          {newProperty?.fields.map((field, index) => (
            <div key={index}>
              <p className="dark:text-whiteSecondary text-blackPrimary">
                {index + 1}. {field.label_en}
              </p>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                Field Label TM
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary"
                value={newField.label_tm}
                onChange={(e) =>
                  handleNewFieldChange("label_tm", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                Field Label RU
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary"
                value={newField.label_ru}
                onChange={(e) =>
                  handleNewFieldChange("label_ru", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                Field Label EN
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary"
                value={newField.label_en}
                onChange={(e) =>
                  handleNewFieldChange("label_en", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                Field Type
              </label>
              <select
                value={newField.type}
                onChange={(e) => handleNewFieldChange("type", e.target.value)}
                className="mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="select">Select</option>
              </select>
            </div>
          </div>
          {/*Input for new property values*/}
          <div className="grid grid-cols-2 gap-4">
            {newProperty?.fields.map((field) => (
              <div key={field.label_en}>
                <label className="block text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
                  {field.label_en}
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full rounded border dark:bg-blackSecondary bg-white focus:ring focus:ring-opacity-50 dark:text-whiteSecondary text-blackPrimary"
                  onChange={(e) =>
                    handleNewPropertyChange(getFieldName(field), e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          {errors.field && (
            <p className="text-red-500 text-sm mt-2">{errors.field}</p>
          )}
          <button
            onClick={addField}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Field
          </button>

          <button
            onClick={addProperty}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProporties;
