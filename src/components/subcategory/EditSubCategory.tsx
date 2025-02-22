import { AiOutlineSave } from "react-icons/ai";
import { InputWithLabel, Sidebar, SimpleInput, TextAreaInput } from "..";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Fetch subcategory by ID
const fetchSubcategoryById = async (subcategoryId: string) => {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategoryId}`
  );
  if (!response.ok) throw new Error("Failed to fetch subcategory");
  return response.json();
};

// Update subcategory by ID
const updateSubcategory = async (subcategoryId: string, data: FormData) => {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategoryId}`,
    {
      method: "PATCH",
      body: data,
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update subcategory");
  }
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch(`http://localhost:3000/category`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const EditSubCategory = () => {
  const { subcategoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [inputObject, setInputObject] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    desc_tm: "",
    desc_ru: "",
    desc_en: "",
    imageUrl: "",
    category_id: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);

  // Load subcategory data
  useEffect(() => {
    const loadSubcategory = async () => {
      setIsLoading(true);
      try {
        let data;
        if (location.state?.subcategory) {
          data = location.state.subcategory;
        } else if (subcategoryId) {
          data = await fetchSubcategoryById(subcategoryId);
        }

        if (data) {
          setInputObject(data);
        }

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch subcategory:", error);
        setError("Failed to load subcategory details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSubcategory();
  }, [subcategoryId, location.state]);

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
    formData.append("category_id", inputObject.category_id);

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (
      inputObject.imageUrl &&
      typeof inputObject.imageUrl === "string"
    ) {
      formData.append("file", inputObject.imageUrl);
    }

    try {
      await updateSubcategory(subcategoryId!, formData);
      alert("Subcategory updated successfully!");
      navigate("/admin/subcategories");
    } catch (error) {
      console.error("Failed to update subcategory:", error);
      setError(error instanceof Error ? error.message : "An error occurred.");
    }
  };

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
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Edit
            </h2>
            <div className="flex gap-x-2">
              <button
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
                onClick={handleUpdate}
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Update
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 mb-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic Information
              </h3>
              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="SubCategory Title (Turkmen)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter subcategory title in Turkmen..."
                    value={inputObject.title_tm}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_tm: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="SubCategory Title (Russian)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter subcategory title in Russian..."
                    value={inputObject.title_ru}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_ru: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="SubCategory Title (English)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter subcategory title in English..."
                    value={inputObject.title_en}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_en: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <h3 className="text-2xl font-bold leading-3 dark:text-whiteSecondary text-blackPrimary mt-6">
                  Subcategory Image
                </h3>
                <div className="flex flex-col gap-3">
                  {inputObject.imageUrl ? (
                    <img
                      src={inputObject.imageUrl}
                      alt="Subcategory"
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
                <div className="mt-4">
                  <InputWithLabel label="Category">
                    <select
                      className="w-full py-2 px-4 border border-gray-300 rounded text-blackPrimary dark:text-whiteSecondary dark:bg-[#011936] bg-whiteSecondary"
                      value={inputObject.category_id}
                      onChange={(e) =>
                        setInputObject({
                          ...inputObject,
                          category_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a Category</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.title_tm}
                        </option>
                      ))}
                    </select>
                  </InputWithLabel>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                SubCategory Description
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <InputWithLabel label="Description (Turkmen)">
                  <TextAreaInput
                    placeholder="Enter description in Turkmen..."
                    rows={4}
                    value={inputObject.desc_tm}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        desc_tm: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Description (Russian)">
                  <TextAreaInput
                    placeholder="Enter description in Russian..."
                    rows={4}
                    value={inputObject.desc_ru}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        desc_ru: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Description (English)">
                  <TextAreaInput
                    placeholder="Enter description in English..."
                    rows={4}
                    value={inputObject.desc_en}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        desc_en: e.target.value,
                      })
                    }
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

export default EditSubCategory;
