import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { FaEdit, FaPlus, FaArrowLeft, FaCogs, FaUndo } from "react-icons/fa";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { FaClipboardList, FaFlag, FaTruck } from "react-icons/fa6";
import { BASE_URL } from "../../api/base";
import TableSkeleton from "../common/TableSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RulesTabs = () => {
  const endpoints = [
    { name: "Delivery Rule", url: `${BASE_URL}/delivery-rule` },
    { name: "Service Rule", url: `${BASE_URL}/service-rule` },
    { name: "Return Rule", url: `${BASE_URL}/return-rule` },
    { name: "Order Rule", url: `${BASE_URL}/order-rule` },
    { name: "Embassy Rules", url: `${BASE_URL}/embassy-rules` },
  ];

  const [activeTab, setActiveTab] = useState(endpoints[0].name);
  const [language, setLanguage] = useState<"tm" | "ru" | "en">("en");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any | null>(null);

  const { data: rulesData, error } = useSWR(
    endpoints.find((endpoint) => endpoint.name === activeTab)?.url,
    fetcher
  );
  const [initialDataLoad, setInitialDataLoad] = useState(false);

  useEffect(() => {
    if (rulesData && !initialDataLoad) {
      setInitialDataLoad(true);
    }
  }, [rulesData, initialDataLoad]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as "tm" | "ru" | "en");
  };

  const handleAddOrEditClick = (rule: any | null) => {
    setSelectedRule(rule);
    setIsEditing(true);
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

    let requestUrl = `${BASE_URL}/${activeTab.toLowerCase().replace(" ", "-")}`;
    let method = "POST";
    if (isEditing && selectedRule) {
      requestUrl = `${requestUrl}/${selectedRule.id}`;
      method = "PATCH";
    }

    await fetch(requestUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRule),
    });

    setIsEditing(false);
    mutate(endpoints.find((endpoint) => endpoint.name === activeTab)?.url);
  };

  const renderRule = (rule: any) => (
    <div
      key={rule.id}
      className="rule-item p-6 bg-white shadow-lg rounded-xl mb-6 transition-transform transform hover:scale-102 hover:shadow-xl ease-in-out duration-300"
    >
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
      <div
        onClick={() => handleAddOrEditClick(rule)}
        className="custom-action-div flex items-center w-40 gap-3 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl"
      >
        <FaEdit /> <span>Edit Rule</span>
      </div>
    </div>
  );

  if (error) {
    return <div>Error loading rules...</div>;
  }

  if (!rulesData && !initialDataLoad) {
    return <TableSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen transition-all duration-500 ease-in-out">
      {isEditing ? (
        <div></div>
      ) : (
        <div className="mb-6 border-b border-gray-200 flex justify-start">
          <nav className="flex space-x-2">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.name}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                    ${
                      activeTab === endpoint.name
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                onClick={() => setActiveTab(endpoint.name)}
              >
                <span className="inline-flex items-center">
                  {endpoint.name === "Delivery Rule" && (
                    <FaTruck className="mr-1" />
                  )}
                  {endpoint.name === "Service Rule" && (
                    <FaCogs className="mr-1" />
                  )}
                  {endpoint.name === "Return Rule" && (
                    <FaUndo className="mr-1" />
                  )}
                  {endpoint.name === "Order Rule" && (
                    <FaClipboardList className="mr-1" />
                  )}
                  {endpoint.name === "Embassy Rules" && (
                    <FaFlag className="mr-1" />
                  )}
                  {endpoint.name}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}

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
        ) : rulesData && initialDataLoad ? (
          rulesData.length > 0 ? (
            rulesData.map((rule: any) => renderRule(rule))
          ) : (
            <div
              onClick={() => handleAddOrEditClick(null)}
              className="custom-action-div flex items-center gap-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <FaPlus /> <span>Add Rule</span>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default RulesTabs;
