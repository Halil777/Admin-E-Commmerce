import React, { useState, useRef, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface FileProps extends File {
  preview?: string;
}

interface ProductImageUploadProps {
  onImageChange: (images: File[]) => void;
  images?: File[];
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  onImageChange,
  images = [],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<FileProps[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []) as FileProps[];

    // Map files and generate previews
    const newFiles = selectedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return { ...file, preview };
    });
    const updatedPreviews = [...imagePreviews, ...newFiles];

    // Update state and notify parent
    setImagePreviews(updatedPreviews);
    onImageChange(selectedFiles);
  };

  const handleRemoveImage = (index: number) => {
    // Revoke preview URL and remove image
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreviews[index].preview || "");

    // Update state and notify parent
    setImagePreviews(updatedPreviews);

    const updatedFiles = images.filter((_, i) => i !== index);
    onImageChange(updatedFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // Cleanup preview URLs on component unmount
    return () => {
      imagePreviews.forEach((file) => URL.revokeObjectURL(file.preview || ""));
    };
  }, [imagePreviews]);

  return (
    <div>
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-600 dark:border-gray-400 rounded-md p-4 cursor-pointer flex flex-col items-center justify-center hover:border-gray-500 duration-200"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-gray-500 dark:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 01-1.081-8.36L15.69 7.591M19.5 19.5a4.5 4.5 0 01-1.23-9.323L17.94 10.49"
          />
        </svg>
        <p className="dark:text-whiteSecondary text-blackPrimary text-sm font-medium">
          Click to upload images
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Image Previews */}
      <div className="mt-2 flex flex-wrap gap-2">
        {imagePreviews.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.preview}
              alt={`Preview ${index}`}
              className="h-16 w-16 rounded border border-gray-600 object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 p-1 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              <HiOutlineTrash className="h-4 w-4 text-red-500 dark:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUpload;
