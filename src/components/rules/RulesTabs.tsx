import { useState } from "react";
import useSWR, { mutate } from "swr";
import { FaEdit, FaPlus, FaArrowLeft, FaCogs, FaUndo } from "react-icons/fa"; // Added Back Arrow for exiting
import SunEditor from "suneditor-react"; // Assuming you are using SunEditor
import "suneditor/dist/css/suneditor.min.css"; // Styles for SunEditor
import { FaClipboardList, FaFlag, FaTruck } from "react-icons/fa6";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RulesTabs = () => {
  const endpoints = [
    { name: "Delivery Rule", url: "http://localhost:3000/delivery-rule" },
    { name: "Service Rule", url: "http://localhost:3000/service-rule" },
    { name: "Return Rule", url: "http://localhost:3000/return-rule" },
    { name: "Order Rule", url: "http://localhost:3000/order-rule" },
    { name: "Embassy Rules", url: "http://localhost:3000/embassy-rules" },
  ];

  const [activeTab, setActiveTab] = useState(endpoints[0].name); // Default to first tab
  const [language, setLanguage] = useState<"tm" | "ru" | "en">("en");
  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const [selectedRule, setSelectedRule] = useState<any | null>(null); // Store selected rule for editing

  const { data: rulesData, error } = useSWR(
    endpoints.find((endpoint) => endpoint.name === activeTab)?.url,
    fetcher
  );

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as "tm" | "ru" | "en");
  };

  const handleAddOrEditClick = (rule: any | null) => {
    setSelectedRule(rule); // Set the rule to be edited (or null for adding a new one)
    setIsEditing(true); // Set edit mode to true
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newRule = {
      title_tm: formData.get("title_tm"),
      title_ru: formData.get("title_ru"),
      title_en: formData.get("title_en"),
      desc_tm: formData.get("desc_tm"),
      desc_ru: formData.get("desc_ru"),
      desc_en: formData.get("desc_en"),
    };

    let requestUrl = `http://localhost:3000/${activeTab
      .toLowerCase()
      .replace(" ", "-")}`;
    let method = "POST"; // Default method for adding
    if (isEditing && selectedRule) {
      requestUrl = `${requestUrl}/${selectedRule.id}`; // Append id for editing
      method = "PATCH"; // Use PATCH for editing
    }

    // Send the request
    await fetch(requestUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRule),
    });

    setIsEditing(false); // Exit edit mode after submit

    // Use mutate to refresh data after adding/editing
    mutate(endpoints.find((endpoint) => endpoint.name === activeTab)?.url);
  };

  const renderRule = (rule: any) => (
    <div
      key={rule.id}
      className="rule-item p-6 bg-white shadow-lg rounded-xl mb-6 transition-transform transform hover:scale-102 hover:shadow-xl ease-in-out duration-300"
    >
      {/* Language Selector inside the Card */}
      <div className="absolute top-4 right-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="tm">Turkmen</option>
          <option value="ru">Russian</option>
          <option value="en">English</option>
        </select>
      </div>

      <h4 className="font-semibold text-2xl mb-4 text-gray-900">
        {language === "tm" && rule.title_tm}
        {language === "ru" && rule.title_ru}
        {language === "en" && rule.title_en}
      </h4>
      <p
        className="text-base text-gray-600 mb-6"
        dangerouslySetInnerHTML={{
          __html:
            language === "tm"
              ? rule.desc_tm
              : language === "ru"
              ? rule.desc_ru
              : rule.desc_en,
        }}
      />
      {/* Conditionally render the Edit or Add button */}
      {rulesData && rulesData.length > 0 ? (
        <div
          onClick={() => handleAddOrEditClick(rule)}
          className="custom-action-div flex items-center w-40 gap-3 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <FaEdit /> <span>Edit Rule</span>
        </div>
      ) : (
        <div
          onClick={() => handleAddOrEditClick(null)}
          className="custom-action-div flex items-center gap-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <FaPlus /> <span>Add Rule</span>
        </div>
      )}
    </div>
  );

  if (error) {
    return <div>Error loading rules...</div>;
  }

  if (!rulesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen transition-all duration-500 ease-in-out">
      {/* Tabs */}
      {isEditing ? (
        <>
          {/* Hide Tab Buttons when Editing or Adding */}
          <div></div>
        </>
      ) : (
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.name}
              className={`tab-item flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-500 rounded-full shadow-lg transform hover:scale-105 cursor-pointer ${
                activeTab === endpoint.name
                  ? "bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(endpoint.name)}
            >
              <span className="icon">
                {endpoint.name === "Delivery Rule" && <FaTruck />}
                {endpoint.name === "Service Rule" && <FaCogs />}
                {endpoint.name === "Return Rule" && <FaUndo />}
                {endpoint.name === "Order Rule" && <FaClipboardList />}
                {endpoint.name === "Embassy Rules" && <FaFlag />}
              </span>
              <span>{endpoint.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Display Active Tab Rule or Form */}
      <div className="bg-white rounded-xl p-8 shadow-lg relative">
        {isEditing ? (
          <>
            <div
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
            >
              <FaArrowLeft />
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title (Turkmen)</label>
                <input
                  type="text"
                  name="title_tm"
                  defaultValue={selectedRule ? selectedRule.title_tm : ""}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Title (Russian)</label>
                <input
                  type="text"
                  name="title_ru"
                  defaultValue={selectedRule ? selectedRule.title_ru : ""}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Title (English)</label>
                <input
                  type="text"
                  name="title_en"
                  defaultValue={selectedRule ? selectedRule.title_en : ""}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description (Turkmen)
                </label>
                <SunEditor
                  name="desc_tm"
                  defaultValue={selectedRule ? selectedRule.desc_tm : ""}
                  setOptions={{
                    height: "200",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["list", "align", "link"],
                      ["undo", "redo"],
                    ],
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description (Russian)
                </label>
                <SunEditor
                  name="desc_ru"
                  defaultValue={selectedRule ? selectedRule.desc_ru : ""}
                  setOptions={{
                    height: "200",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["list", "align", "link"],
                      ["undo", "redo"],
                    ],
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description (English)
                </label>
                <SunEditor
                  name="desc_en"
                  defaultValue={selectedRule ? selectedRule.desc_en : ""}
                  setOptions={{
                    height: "200",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["list", "align", "link"],
                      ["undo", "redo"],
                    ],
                  }}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  {selectedRule ? "Save Changes" : "Add Rule"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          rulesData.map((rule: any) => renderRule(rule))
        )}
      </div>
    </div>
  );
};

export default RulesTabs;
