import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSettingsOutline, IoCameraOutline } from "react-icons/io5";
import { VISION_DIFFICULTY_SETTINGS } from "../../utils/visionStyles";

const Tools = ({ setVisionDifficulty, device, takeScreenshot }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [screenshotDropdownOpen, setScreenshotDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");

  const menuRef = useRef(null);
  const screenshotRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        screenshotRef.current &&
        !screenshotRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setScreenshotDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end w-full">
      <div className="flex items-center gap-2 relative">
        {/* Settings Button */}
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center justify-center h-full cursor-pointer"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setScreenshotDropdownOpen(false); // Close other modal
            }}
            aria-label="Settings"
          >
            <IoSettingsOutline className="text-[18px] text-gray-700" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <SettingsMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setVisionDifficulty={setVisionDifficulty}
                setMenuOpen={setMenuOpen}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Screenshot Button with Dropdown */}
        <div className="relative" ref={screenshotRef}>
          <button
            className="flex items-center justify-center h-full cursor-pointer"
            onClick={() => {
              setScreenshotDropdownOpen((prev) => !prev);
              setMenuOpen(false); // Close other modal
            }}
            aria-label="Screenshot"
          >
            <IoCameraOutline className="text-[18px] text-gray-700" />
          </button>

          <AnimatePresence>
            {screenshotDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-[220px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-1"
              >
                <button
                  onClick={() => {
                    takeScreenshot("viewport");
                    setScreenshotDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-[14px] cursor-pointer"
                >
                  Viewport Screenshot
                </button>
                <button
                  onClick={() => {
                    takeScreenshot("full");
                    setScreenshotDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-[14px] cursor-pointer"
                >
                  Full Screenshot
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// === Settings Menu Component ===
const SettingsMenu = ({
  activeTab,
  setActiveTab,
  setVisionDifficulty,
  setMenuOpen,
}) => {
  const tabs = [
    { id: "vision", label: "Vision" },
    { id: "device", label: "Device" },
  ];

  const tabStyles = (isActive) =>
    `text-sm font-medium px-4 py-2 rounded-md transition cursor-pointer mr-1 ${
      isActive
        ? "bg-gray-100 text-gray-900"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`;

  const handleVisionChange = (settingId) => {
    setVisionDifficulty(settingId);
    setMenuOpen(false);
  };

  const logSettingClick = (settingType, value) => {
    console.log(`${settingType} toggled to: ${value}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={tabStyles(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-gray-700">
        {activeTab === "vision" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {VISION_DIFFICULTY_SETTINGS.map((setting) => (
              <button
                key={setting.id}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleVisionChange(setting.id)}
              >
                {setting.name}
              </button>
            ))}
          </motion.div>
        )}

        {activeTab === "device" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* CSS Toggle */}
            <div>
              <label className="block mb-1 text-gray-600">Enable CSS</label>
              <div className="flex gap-2">
                <button
                  className="flex-1 px-3 py-1 rounded-md border hover:bg-gray-50 transition"
                  onClick={() => logSettingClick("CSS", "Enabled")}
                >
                  Enabled
                </button>
                <button
                  className="flex-1 px-3 py-1 rounded-md border hover:bg-gray-50 transition"
                  onClick={() => logSettingClick("CSS", "Disabled")}
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* JS Toggle */}
            <div>
              <label className="block mb-1 text-gray-600">Enable JS</label>
              <div className="flex gap-2">
                <button
                  className="flex-1 px-3 py-1 rounded-md border hover:bg-gray-50 transition"
                  onClick={() => logSettingClick("JS", "Enabled")}
                >
                  Enabled
                </button>
                <button
                  className="flex-1 px-3 py-1 rounded-md border hover:bg-gray-50 transition"
                  onClick={() => logSettingClick("JS", "Disabled")}
                >
                  Disabled
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Tools;
