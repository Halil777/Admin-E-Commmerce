import { AiOutlineSave } from "react-icons/ai";
import { InputWithLabel, Sidebar, SimpleInput } from "..";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/base";

// Fetch category by ID
const fetchCategoryById = async (categoryId: string) => {
  const response = await fetch(`${BASE_URL}category/${categoryId}`);
  if (!response.ok) throw new Error("Failed to fetch category");
  return response.json();
};

// Update category by ID
const updateCategory = async (categoryId: string, data: FormData) => {
  const response = await fetch(`${BASE_URL}category/${categoryId}`, {
    method: "PATCH",
    body: data, // Send FormData
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update category");
  }
  return response.json();
};

const EditCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [inputObject, setInputObject] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    desc_tm: "",
    desc_ru: "",
    desc_en: "",
    imageUrl: "", // This should be kept for existing image URL
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Track uploaded file
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load category data
  useEffect(() => {
    const loadCategory = async () => {
      if (location.state?.category) {
        setInputObject(location.state.category);
      } else if (categoryId) {
        setIsLoading(true);
        try {
          const data = await fetchCategoryById(categoryId);
          setInputObject(data);
        } catch (error) {
          console.error("Failed to fetch category:", error);
          setError("Failed to load category details.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCategory();
  }, [categoryId, location.state]);

  // Handle form submission
  // Handle form submission
  const handleUpdate = async () => {
    setError(null);
    const formData = new FormData();
    formData.append("title_tm", inputObject.title_tm);
    formData.append("title_ru", inputObject.title_ru);
    formData.append("title_en", inputObject.title_en);
    formData.append("desc_tm", inputObject.desc_tm);
    formData.append("desc_ru", inputObject.desc_ru);
    formData.append("desc_en", inputObject.desc_en);

    // Append the new image file if selected
    if (selectedFile) {
      formData.append("file", selectedFile); // Append the new image file
    } else if (
      inputObject.imageUrl &&
      typeof inputObject.imageUrl === "string"
    ) {
      // Only append the imageUrl if it’s a string (not a file) and it's a URL
      formData.append("file", inputObject.imageUrl); // Send the existing image URL if no new image is selected
    }

    try {
      await updateCategory(categoryId!, formData);
      alert("Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
      setError(error instanceof Error ? error.message : "An error occurred.");
    }
  };
  console.log("edit category error" + error);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10 px-4 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8 pb-8  flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <h2 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Edit Category
            </h2>
            <div className="flex gap-x-2">
              <button
                className="dark:bg-blackPrimary bg-whiteSecondary  w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
                onClick={handleUpdate}
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Update Category
                </span>
              </button>
            </div>
          </div>
          <div className="dark:bg-blackSecondary rounded-lg shadow:3xl bg-white rounded p-6 shadow">
            <h3 className="text-lg font-semibold dark:text-whiteSecondary text-blackPrimary">
              Основная информация
            </h3>
            <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
              <div>
                <div className="flex flex-col gap-3 lg:w-1/2">
                  <InputWithLabel label="Название (TM)">
                    <SimpleInput
                      type="text"
                      placeholder="Enter category title in Turkmen..."
                      value={inputObject.title_tm}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          title_tm: e.target.value,
                        })
                      }
                      className="w-full rounded"
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Category Title (Russian)">
                    <SimpleInput
                      type="text"
                      placeholder="Enter category title in Russian..."
                      value={inputObject.title_ru}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          title_ru: e.target.value,
                        })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Category Title (English)">
                    <SimpleInput
                      type="text"
                      placeholder="Enter category title in English..."
                      value={inputObject.title_en}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          title_en: e.target.value,
                        })
                      }
                    />
                  </InputWithLabel>
                </div>
              </div>
              <div>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    {inputObject.imageUrl ? (
                      <img
                        src={inputObject.imageUrl}
                        alt="Category"
                        className="w-full h-48 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
                        <span>No Image Available</span>
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="w-full py-2 px-4 border border-gray-300 rounded"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
