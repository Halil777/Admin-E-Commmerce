import { useState } from "react";

const ImageUploadInput = ({ onImageChange: any }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImagePreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    onImageChange(selectedFiles);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-2 pr-6 cursor-pointer hover:border-gray-500 text-sm"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="h-16 w-16 rounded border border-gray-600 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadInput;
