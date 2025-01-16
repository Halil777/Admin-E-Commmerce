import { useState, useRef } from "react";
import { mutate } from "swr";
import { AiOutlineSave } from "react-icons/ai";
import Sidebar from "../Sidebar";
import InputWithLabel from "../InputWithLabel";
import SimpleInput from "../SimpleInput";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/base";
import { HiOutlinePhoto } from "react-icons/hi2";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    imageUrl: "" as string | File,
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
      }));
      // Display image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger the file input
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title_tm", formData.title_tm);
    formDataToSend.append("title_ru", formData.title_ru);
    formDataToSend.append("title_en", formData.title_en);
    formDataToSend.append("desc_tm", "");
    formDataToSend.append("desc_ru", "");
    formDataToSend.append("desc_en", "");

    if (formData.imageUrl) {
      formDataToSend.append("file", formData.imageUrl);
    }

    try {
      const response = await fetch(`${BASE_URL}category`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        mutate(`${BASE_URL}category`);
        setFormData({
          title_tm: "",
          title_ru: "",
          title_en: "",
          imageUrl: "",
        });
        setPreviewImage(null);
        alert("Категория успешно создана!");
        navigate("/admin/categories");
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.message}`);
      }
    } catch (error: any) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:gap-5">
            <h2 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Добавить новую категорию
            </h2>
          </div>

          {/* Combined Card */}
          <div className="dark:bg-blackSecondary rounded-lg shadow:3xl bg-white rounded p-6 shadow">
            <h3 className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary mb-4">
              Основная информация
            </h3>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col gap-3 lg:w-1/2">
                <InputWithLabel label="Название (TM)">
                  <SimpleInput
                    type="text"
                    name="title_tm"
                    value={formData.title_tm}
                    onChange={handleChange}
                    placeholder="Введите название категории на туркменском..."
                    className="w-full rounded"
                  />
                </InputWithLabel>

                <InputWithLabel label="Название (RU)">
                  <SimpleInput
                    type="text"
                    name="title_ru"
                    value={formData.title_ru}
                    onChange={handleChange}
                    placeholder="Введите название категории на русском..."
                    className="w-full rounded"
                  />
                </InputWithLabel>

                <InputWithLabel label="Название (EN)">
                  <SimpleInput
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleChange}
                    placeholder="Введите название категории на английском..."
                    className="w-full rounded"
                  />
                </InputWithLabel>
              </div>
              <div className="flex flex-col justify-between gap-3 lg:w-1/2">
                <div className="flex items-center justify-end">
                  <div
                    onClick={handleCardClick}
                    className="w-full dark:bg-gray-700 bg-gray-100 rounded p-4 text-center flex flex-col items-center justify-center cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-200 shadow-md"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-32 max-w-full object-contain mb-2"
                      />
                    ) : (
                      <>
                        <HiOutlinePhoto className="text-4xl dark:text-whiteSecondary text-blackPrimary mb-2" />
                        <label className="cursor-pointer block w-full dark:text-whiteSecondary text-blackPrimary ">
                          Выберите изображение для категории
                        </label>
                        <span className="block text-sm mt-2 dark:text-whiteSecondary text-blackPrimary">
                          Разрешенные форматы: .jpg, .jpeg, .png
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      id="imageInput"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="dark:bg-blackPrimary rounded bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
                  >
                    <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                    <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                      {loading ? "Сохранить..." : "Сохранить"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
