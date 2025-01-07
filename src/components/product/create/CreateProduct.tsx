import { FC, useState } from "react";
import RequiredDatas from "./RequiredDatas";
import ProductImageUpload from "./ProductImageUpload";
import SelectCategories from "./SelectCategories";
import Sidebar from "../../Sidebar";
import { AiOutlineSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NotRequiredDatas from "./NotRequiredDatas";
import { BASE_URL } from "../../../api/base";

const CreateProduct: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    stock: 0,
    price: 0,
    category: "", // Make sure this has a valid default value
    subcategory: "", // Same for subcategory
    segment: "", // Same for segment
    brand: "", // Same for brand
    images: [] as File[],
    desc_tm: "",
    desc_ru: "",
    desc_en: "",
    old_price: 0,
    discount_percentage: 0,
    discounted_price: 0,
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    size: "",
    color: "",
    tags: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      let updatedValue = value;
      if (field === "stock") {
        updatedValue = value ? parseInt(value, 10) : 0;
        if (isNaN(updatedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            stock: "Stock must be a number",
          }));
          return { ...prev, [field]: 0 };
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, stock: "" }));
        }
      }

      if (field === "price") {
        updatedValue = value ? parseFloat(value) : 0;
        if (isNaN(updatedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            price: "Price must be a number",
          }));
          return { ...prev, [field]: 0 };
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
        }
      }

      if (
        field === "old_price" ||
        field === "discount_percentage" ||
        field === "discounted_price" ||
        field === "weight" ||
        field === "width" ||
        field === "height" ||
        field === "depth"
      ) {
        updatedValue = value ? parseFloat(value) : 0;
        if (isNaN(updatedValue)) {
          // Error is handled inside NotRequiredDatas component
          return prev;
        }
      }
      return { ...prev, [field]: updatedValue };
    });
  };

  const handleImageChange = (images: File[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  // Function to create a product
  const createProduct = async (productData: any) => {
    const form = new FormData();

    // Append text fields to FormData
    form.append("title_tm", productData.title_tm);
    form.append("title_ru", productData.title_ru);
    form.append("title_en", productData.title_en);
    form.append("stock", String(productData.stock));
    form.append("price", String(productData.price));
    form.append("category_id", productData.category); // Use category_id here
    form.append("subcategory", productData.subcategory);
    form.append("segment_id", productData.segment); // Use segment_id here
    form.append("brand_id", productData.brand); // Use brand_id here
    form.append("desc_tm", productData.desc_tm);
    form.append("desc_ru", productData.desc_ru);
    form.append("desc_en", productData.desc_en);
    form.append("old_price", String(productData.old_price));
    form.append("discount_percentage", String(productData.discount_percentage));
    form.append("discounted_price", String(productData.discounted_price));
    form.append("weight", String(productData.weight));
    form.append("width", String(productData.width));
    form.append("height", String(productData.height));
    form.append("depth", String(productData.depth));
    form.append("size", productData.size);
    form.append("color", productData.color);
    form.append("tags", productData.tags);

    // Append images to FormData
    if (productData.images) {
      productData.images.forEach((image: File) => {
        form.append("images", image);
      });
    }

    const response = await fetch(`${BASE_URL}products`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Product creation failed:", errorText);
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.message) {
          alert(errorData.message.join(", "));
        }
      } catch (parseError) {
        alert(errorText);
      }

      throw new Error(errorText || "Failed to create product");
    }

    const data = await response.json();
    console.log("Product created successfully:", data);
    navigate("/products");
    return data; // Return the created product (including its ID)
  };

  // Handle submission of the product and images
  const handleSubmit = async () => {
    const productData = {
      title_tm: formData.title_tm,
      title_ru: formData.title_ru,
      title_en: formData.title_en,
      stock: formData.stock,
      price: formData.price,
      category: formData.category, // Send category id
      subcategory: formData.subcategory,
      segment: formData.segment, // Send segment id
      brand: formData.brand, // Send brand id
      images: formData.images,
      desc_tm: formData.desc_tm,
      desc_ru: formData.desc_ru,
      desc_en: formData.desc_en,
      old_price: formData.old_price,
      discount_percentage: formData.discount_percentage,
      discounted_price: formData.discounted_price,
      weight: formData.weight,
      width: formData.width,
      height: formData.height,
      depth: formData.depth,
      size: formData.size,
      color: formData.color,
      tags: formData.tags,
    };
    console.log("Sending product data:", productData);
    await createProduct(productData);
  };

  return (
    <div className="flex h-auto min-h-screen dark:bg-blackPrimary bg-whiteSecondary border-t border-blackSecondary">
      <Sidebar />

      <div className="flex-1 p-6">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="p-6 bg-white rounded shadow-md dark:bg-blackPrimary">
              <RequiredDatas
                onChange={handleInputChange}
                data={formData}
                errors={errors}
              />
            </div>
            <div className="p-6 bg-white rounded shadow-md dark:bg-blackPrimary">
              <SelectCategories onChange={handleInputChange} data={formData} />
            </div>
            <div className="p-6 bg-white rounded shadow-md dark:bg-blackPrimary">
              <ProductImageUpload
                onImageChange={handleImageChange}
                images={formData.images}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white rounded shadow-md dark:bg-blackPrimary">
              <NotRequiredDatas
                onChange={handleInputChange}
                data={formData}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
