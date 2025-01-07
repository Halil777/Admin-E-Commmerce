import { useState } from "react";
import { mutate } from "swr";
import { AiOutlineSave } from "react-icons/ai";
import Sidebar from "../Sidebar";
import InputWithLabel from "../InputWithLabel";
import SimpleInput from "../SimpleInput";
import TextAreaInput from "../TextAreaInput";
import { useNavigate } from "react-router-dom";

const CreateBrand = () => {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    desc_tm: "",
    desc_ru: "",
    desc_en: "",
    imageUrl: "" as string | File,
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change (new code)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file, // Store the file object
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title_tm", formData.title_tm);
    formDataToSend.append("title_ru", formData.title_ru);
    formDataToSend.append("title_en", formData.title_en);
    formDataToSend.append("desc_tm", formData.desc_tm);
    formDataToSend.append("desc_ru", formData.desc_ru);
    formDataToSend.append("desc_en", formData.desc_en);

    // If there is an image file, append it to the FormData
    if (formData.imageUrl) {
      formDataToSend.append("file", formData.imageUrl); // Append the file directly
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await fetch(`${BASE_URL}brands`, {
        method: "POST",
        body: formDataToSend, // Send FormData, not JSON
      });

      if (response.ok) {
        mutate(`${BASE_URL}brands`);
        setFormData({
          title_tm: "",
          title_ru: "",
          title_en: "",
          desc_tm: "",
          desc_ru: "",
          desc_en: "",
          imageUrl: "",
        });
        alert("Brand created successfully!");
        navigate("/brands");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new brand
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
                Basic Information
              </h3>
              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Brand Title (Turkmen)">
                  <SimpleInput
                    type="text"
                    name="title_tm"
                    value={formData.title_tm}
                    onChange={handleChange}
                    placeholder="Enter brand title in Turkmen..."
                  />
                </InputWithLabel>
                <InputWithLabel label="Brand Title (Russian)">
                  <SimpleInput
                    type="text"
                    name="title_ru"
                    value={formData.title_ru}
                    onChange={handleChange}
                    placeholder="Enter brand title in Russian..."
                  />
                </InputWithLabel>
                <InputWithLabel label="Brand Title (English)">
                  <SimpleInput
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleChange}
                    placeholder="Enter brand title in English..."
                  />
                </InputWithLabel>
                <h3 className="text-2xl font-bold leading-3 dark:text-whiteSecondary text-blackPrimary mt-6">
                  Brand Image
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

export default CreateBrand;
