import React, { useState } from "react";
import { Sidebar } from "..";
import { AiOutlineSave } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProductFormLeft from "./ProductFormLeft";
import ProductFormRight from "./ProductFormRight";
import { FileProps, FormDataI } from "./types/types";
import { useCategories } from "../../hooks/category/useCategory";
import { useBrand } from "../../hooks/brand/useBrand";

const CreateProduct: React.FC = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { brands } = useBrand<any[]>("/");
  const { categories } = useCategories<any[]>("");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataI>({
    defaultValues: {
      is_active: true,
    },
  });

  const handleImageChange = (files: FileProps[]) => {
    setFiles(files);
  };

  const onSubmit = async (data: FormDataI) => {
    console.log("Submitting form with data:", data);
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();

      // Append fields
      for (const key in data) {
        if (key !== "categories") {
          formData.append(key, String(data[key as keyof FormDataI] || ""));
        }
      }

      // Handle categories as JSON
      if (data.categories) {
        formData.append("categories", JSON.stringify(data.categories));
      }

      // Append images
      files.forEach((file, index) => {
        formData.append(`images[${index}][url]`, file.url);
        if (file.is_main) {
          formData.append(`images[${index}][is_main]`, "true");
        }
        if (file.alt_text) {
          formData.append(`images[${index}][alt_text]`, file.alt_text);
        }
      });

      console.log("FormData before request:", formData);

      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Product created successfully");
        console.log("API Call Success:", response);
        setLoading(false);
      } else {
        setError(new Error(response.data || "An error occurred"));
        setLoading(false);
      }
    } catch (err: any) {
      setError(err);
      setLoading(false);
      console.error("API Call Error:", err);
    }
  };

  if (loading) {
    return <p>Creating product...</p>;
  }

  if (error) {
    return <p>Error creating product: {error.message}</p>;
  }

  const renderRequiredLabel = (label: string) => (
    <span className="flex items-center gap-1">
      {label} <span className="text-red-500">*</span>
    </span>
  );

  const renderOptionalLabel = (label: string) => (
    <span className="flex items-center gap-1">{label}</span>
  );

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="hover:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-6 lg:px-8 pb-6 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                  Add a product
                </h2>
              </div>
              <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-1 max-[370px]:items-center">
                <button
                  type="submit"
                  className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-32 py-1 text-sm dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-1"
                >
                  <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-base" />
                  <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                    Save
                  </span>
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-6 flex gap-x-6 max-xl:flex-col max-xl:gap-y-6">
              <ProductFormLeft
                renderRequiredLabel={renderRequiredLabel}
                renderOptionalLabel={renderOptionalLabel}
                register={register}
                errors={errors}
                control={control}
              />
              <ProductFormRight
                renderOptionalLabel={renderOptionalLabel}
                register={register}
                errors={errors}
                brands={brands || []}
                categories={categories || []}
                handleImageChange={handleImageChange}
                files={files}
                setValue={setValue}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
