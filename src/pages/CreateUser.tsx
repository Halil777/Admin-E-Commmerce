import React, { useState, useRef } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { InputWithLabel, Sidebar, SimpleInput } from "../components";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserViewModel, {
  UserRegisterResponse,
} from "../store/users/UserViewModel";
import axios from "axios";
import { BASE_URL } from "../api/base";

// Create an instance of the UserViewModel
const userViewModel = new UserViewModel();

const CreateUser = observer(() => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+993");
  const [isNotify, setIsNotify] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setProfileImageFile(null);
      return;
    }
    const file = event.target.files[0];
    setProfileImageFile(file);
  };
  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    if (!profileImageFile) {
      alert("Please upload a profile image");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("isNotify", String(isNotify));
    formData.append("file", profileImageFile);

    try {
      const response = await axios.post(`${BASE_URL}users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        throw new Error(`File upload failed: ${response}`);
      }
      const data = response.data as UserRegisterResponse;

      const success = await userViewModel.createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: password,
        profileImage: data.profileImage,
        phoneNumber: data.phoneNumber,
        is_confirmed: data.is_confirmed,
        is_notify: data.is_notify,
      });

      if (success) {
        alert("User Created");
        navigate("/admin/users");
      } else {
        alert("Failed to create user.");
      }
    } catch (error: any) {
      console.error("File upload failed:", error);
      alert("Failed to create user.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold leading-6 dark:text-whiteSecondary text-blackPrimary">
                Add new user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save
                </span>
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="First Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter first name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputWithLabel>
                <InputWithLabel label="Lastname">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a lastname..."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a email ..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputWithLabel>
                <InputWithLabel label="Phone Number">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a phone number..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputWithLabel>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Upload user image
              </h3>
              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Profile Image">
                  <input
                    type="file"
                    className="border border-gray-300 rounded px-3 py-2 dark:bg-blackSecondary bg-whitePrimary dark:text-whiteSecondary text-blackPrimary"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </InputWithLabel>
                <InputWithLabel label="Notify">
                  <input
                    type="checkbox"
                    className="border border-gray-300 rounded px-3 py-2 dark:bg-blackSecondary bg-whitePrimary dark:text-whiteSecondary text-blackPrimary"
                    checked={isNotify}
                    onChange={(e) => setIsNotify(e.target.checked)}
                  />
                </InputWithLabel>
                <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter a password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputWithLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateUser;
