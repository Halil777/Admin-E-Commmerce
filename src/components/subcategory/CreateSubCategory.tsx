import { FC, useState } from "react";
import { mutate } from "swr";
import { AiOutlineSave } from "react-icons/ai";
import Sidebar from "../Sidebar";
import InputWithLabel from "../InputWithLabel";
import SimpleInput from "../SimpleInput";
import TextAreaInput from "../TextAreaInput";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/category/useCategory";

const CreateSubCategory: FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading, isError } = useCategories();

  const [formData, setFormData] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    desc_tm: "",
    desc_ru: "",
    desc_en: "",
    imageUrl: "" as string | File,
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append("title_tm", formData.title_tm);
    formDataToSend.append("title_ru", formData.title_ru);
    formDataToSend.append("title_en", formData.title_en);
    formDataToSend.append("desc_tm", formData.desc_tm);
    formDataToSend.append("desc_ru", formData.desc_ru);
    formDataToSend.append("desc_en", formData.desc_en);
    formDataToSend.append("categoryId", formData.categoryId);
    if (formData.imageUrl) {
      formDataToSend.append("file", formData.imageUrl);
    }
    try {
      // Corrected URL here
      const response = await fetch("http://localhost:3000/subcategories", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        setSuccess("Subcategory created successfully!");
        mutate("http://localhost:3000/subcategories");
        setFormData({
          title_tm: "",
          title_ru: "",
          title_en: "",
          desc_tm: "",
          desc_ru: "",
          desc_en: "",
          imageUrl: "",
          categoryId: "",
        });
        setTimeout(() => {
          navigate("/subcategories");
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(
          `Error: ${errorData.message || "Failed to create subcategory"}`
        );
      }
    } catch (error: any) {
      setError(`Error: ${error.message || "Failed to create subcategory"}`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Failed to load categories.</div>;

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new subcategory
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  {loading ? "Saving..." : "Save"}
                </span>
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* Left Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Subcategory Information
              </h3>
              {success && <p className="text-green-500 mt-2">{success}</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Subcategory Title (Turkmen)">
                  <SimpleInput
                    type="text"
                    name="title_tm"
                    value={formData.title_tm}
                    onChange={handleChange}
                    placeholder="Enter category title in Turkmen..."
                  />
                </InputWithLabel>
                <InputWithLabel label="Subcategory Title (Russian)">
                  <SimpleInput
                    type="text"
                    name="title_ru"
                    value={formData.title_ru}
                    onChange={handleChange}
                    placeholder="Enter category title in Russian..."
                  />
                </InputWithLabel>
                <InputWithLabel label="Subcategory Title (English)">
                  <SimpleInput
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleChange}
                    placeholder="Enter category title in English..."
                  />
                </InputWithLabel>
                <h3 className="text-2xl font-bold leading-3 dark:text-whiteSecondary text-blackPrimary mt-6">
                  Subcategory Image
                </h3>
                {/* File Input for Image */}
                <div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full py-2 px-4 border border-gray-300 rounded"
                  />
                </div>
                <label className="dark:text-whiteSecondary text-blackPrimary">
                  Choose Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
                  className="py-2 px-3 border border-gray-300 rounded"
                >
                  <option value="">Select a category</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.title_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Additional Information
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <InputWithLabel label="Description (Turkmen)">
                  <TextAreaInput
                    name="desc_tm"
                    value={formData.desc_tm}
                    onChange={handleChange}
                    placeholder="Enter description in Turkmen (optional)..."
                    rows={2}
                  />
                </InputWithLabel>
                <InputWithLabel label="Description (Russian)">
                  <TextAreaInput
                    name="desc_ru"
                    value={formData.desc_ru}
                    onChange={handleChange}
                    placeholder="Enter description in Russian (optional)..."
                    rows={2}
                  />
                </InputWithLabel>
                <InputWithLabel label="Description (English)">
                  <TextAreaInput
                    name="desc_en"
                    value={formData.desc_en}
                    onChange={handleChange}
                    placeholder="Enter description in English (optional)..."
                    rows={2}
                  />
                </InputWithLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
