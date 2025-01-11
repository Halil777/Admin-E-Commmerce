import { FC, useState, useEffect } from "react";
// Assuming these components are available
import { AiOutlineSave } from "react-icons/ai";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BASE_URL } from "../../../api/base";
import SelectCategories from "../create/SelectCategories"; // If needed here
import InputWithLabel from "../../InputWithLabel";
import SimpleInput from "../../SimpleInput";
import TextAreaInput from "../../TextAreaInput";
import Sidebar from "../../Sidebar";

// Fetch product by ID
const fetchProductById = async (productId: string) => {
  const response = await fetch(`${BASE_URL}products/${productId}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

// Update product by ID
const updateProduct = async (productId: string, data: FormData) => {
  const response = await fetch(`${BASE_URL}products/${productId}`, {
    method: "PATCH",
    body: data,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update product");
  }
  return response.json();
};

const EditProduct: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const [inputObject, setInputObject] = useState({
    title_tm: "",
    title_ru: "",
    title_en: "",
    stock: 0,
    price: 0,
    category: "",
    subcategory: "",
    segment: "",
    brand_id: "",
    images: [],
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
    is_active: true,
    views: 0,
    categories: [],
    segment_id: 0,
  });

  const [selectedFiles, setSelectedFiles] = useState<(File | string)[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (location.state?.product) {
        setInputObject(location.state.product);
      } else if (productId) {
        setIsLoading(true);
        try {
          const data = await fetchProductById(productId);
          setInputObject({
            ...data,
            is_active: data.is_active !== undefined ? data.is_active : true,
            views: data.views !== undefined ? parseInt(data.views) : 0,
            brand_id: data.brand_id !== undefined ? parseInt(data.brand_id) : 0,
            categories:
              data.categories !== undefined
                ? data.categories.map((category: any) => parseInt(category))
                : [],
            segment_id:
              data.segment_id !== undefined ? parseInt(data.segment_id) : 0,
          });
        } catch (error) {
          console.error("Failed to fetch product:", error);
          setError("Failed to load product details.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProduct();
  }, [productId, location.state]);

  const handleUpdate = async () => {
    setError(null);
    const formData = new FormData();
    formData.append("title_tm", inputObject.title_tm);
    formData.append("title_ru", inputObject.title_ru);
    formData.append("title_en", inputObject.title_en);
    formData.append("desc_tm", inputObject.desc_tm);
    formData.append("desc_ru", inputObject.desc_ru);
    formData.append("desc_en", inputObject.desc_en);

    if (inputObject.stock !== undefined) {
      formData.append("stock", String(inputObject.stock));
    }
    if (inputObject.price !== undefined) {
      formData.append("price", String(inputObject.price));
    }
    if (inputObject.old_price !== undefined) {
      formData.append("old_price", String(inputObject.old_price));
    }
    if (inputObject.discount_percentage !== undefined) {
      formData.append(
        "discount_percentage",
        String(inputObject.discount_percentage)
      );
    }
    if (inputObject.discounted_price !== undefined) {
      formData.append("discounted_price", String(inputObject.discounted_price));
    }
    if (inputObject.weight !== undefined) {
      formData.append("weight", String(inputObject.weight));
    }
    if (inputObject.width !== undefined) {
      formData.append("width", String(inputObject.width));
    }
    if (inputObject.height !== undefined) {
      formData.append("height", String(inputObject.height));
    }
    if (inputObject.depth !== undefined) {
      formData.append("depth", String(inputObject.depth));
    }
    if (inputObject.size) {
      formData.append("size", inputObject.size);
    }
    if (inputObject.color) {
      formData.append("color", inputObject.color);
    }
    if (inputObject.tags) {
      formData.append("tags", inputObject.tags);
    }
    // Send is_active as boolean, not a string
    if (inputObject.is_active !== undefined) {
      formData.append("is_active", inputObject.is_active ? "true" : "false");
    }
    if (inputObject.views !== undefined) {
      formData.append("views", String(inputObject.views));
    }
    if (inputObject.brand_id !== undefined) {
      formData.append("brand_id", String(inputObject.brand_id));
    }
    if (inputObject.segment_id !== undefined) {
      formData.append("segment_id", String(inputObject.segment_id));
    }
    if (inputObject.subcategory !== undefined) {
      formData.append("subcategory_id", String(inputObject.subcategory));
    }
    // Send categories as an array of numbers
    if (inputObject.categories !== undefined) {
      formData.append(
        "categories",
        JSON.stringify(
          inputObject.categories.map((catId: any) => parseInt(catId))
        )
      );
    }

    selectedFiles?.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`images[${index}]`, file); // Append each file individually
      } else if (typeof file === "string") {
        formData.append(`images[${index}]`, file); // append if URL
      }
    });
    try {
      await updateProduct(productId!, formData);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      setError(error instanceof Error ? error.message : "An error occurred.");
    }
  };
  const handleImageChange = (newFiles: (File | string)[]) => {
    setSelectedFiles(newFiles);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
      </div>
    );
  }
  if (!inputObject) {
    return <div>Error: Product data not loaded.</div>;
  }

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Edit Product
            </h2>
            <div className="flex gap-x-2">
              <button
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
                onClick={handleUpdate}
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Update Product
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
                <InputWithLabel label="Product Title (Turkmen)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product title in Turkmen..."
                    value={inputObject.title_tm}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_tm: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Product Title (Russian)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product title in Russian..."
                    value={inputObject.title_ru}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_ru: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Product Title (English)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product title in English..."
                    value={inputObject.title_en}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        title_en: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Stock">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product stock..."
                    value={inputObject.stock}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Price">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product price..."
                    value={inputObject.price}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <h3 className="text-2xl font-bold leading-3 dark:text-whiteSecondary text-blackPrimary mt-6">
                  Product Image
                </h3>
                <EditProductImageUpload
                  onImageChange={handleImageChange}
                  images={inputObject.images}
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product Description and others
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
                <InputWithLabel label="Old Price">
                  <SimpleInput
                    type="number"
                    placeholder="Enter old price..."
                    value={inputObject.old_price}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        old_price: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Discount Percentage">
                  <SimpleInput
                    type="number"
                    placeholder="Enter discount percentage..."
                    value={inputObject.discount_percentage}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        discount_percentage: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Discounted Price">
                  <SimpleInput
                    type="number"
                    placeholder="Enter discounted price..."
                    value={inputObject.discounted_price}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        discounted_price: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Weight">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product weight..."
                    value={inputObject.weight}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        weight: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Width">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product width..."
                    value={inputObject.width}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        width: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Height">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product height..."
                    value={inputObject.height}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        height: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Depth">
                  <SimpleInput
                    type="number"
                    placeholder="Enter product depth..."
                    value={inputObject.depth}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        depth: parseInt(e.target.value),
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Size">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product size..."
                    value={inputObject.size}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        size: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Color">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product color..."
                    value={inputObject.color}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        color: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Tags">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product tags..."
                    value={inputObject.tags}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        tags: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <SelectCategories
                  onChange={(field: string, value: any) =>
                    setInputObject((prev) => ({ ...prev, [field]: value }))
                  }
                  data={inputObject}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

const EditProductImageUpload = ({
  onImageChange,
  images,
}: {
  onImageChange: (files: (File | string)[]) => void;
  images: string[];
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>(images);
  const [selectedFiles, setSelectedFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    setPreviewImages(images);
    setSelectedFiles(images);
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const newFilesWithPreviews: (File | string)[] = [...selectedFiles];
    newFiles.forEach((file) => {
      newFilesWithPreviews.push(file);
    });

    setSelectedFiles(newFilesWithPreviews);
    setPreviewImages(
      newFilesWithPreviews.map((file) => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        } else {
          return file;
        }
      })
    );
    onImageChange(newFilesWithPreviews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    onImageChange(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-3">
      {previewImages.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {previewImages.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-32 h-32 overflow-hidden rounded"
            >
              <img
                src={imageUrl}
                alt={`product ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-tr hover:bg-red-700 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
          <span>No Image Available</span>
        </div>
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple
        className="w-full py-2 px-4 border border-gray-300 rounded"
        onChange={handleFileChange}
      />
    </div>
  );
};
