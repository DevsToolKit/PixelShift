import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderButton from "../ui/HeaderButton";
import { BsLaptop } from "react-icons/bs";
import { AppContext } from "../../context/AppContext";
import { CgCloseO } from "react-icons/cg";

function SelectedDeviceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("left-0");
  const { selectedDevices, setShowAddDeviceModal, removeDevice } =
    useContext(AppContext);

  const selectedDevicesCount = () =>
    selectedDevices.length > 9 ? "9+" : selectedDevices.length;

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 350;
      const isTooCloseRight =
        window.innerWidth - buttonRect.left < dropdownWidth;
      setDropdownPosition(isTooCloseRight ? "right-[-2rem]" : "left-0");
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={buttonRef}>
      <div className="relative">
        <HeaderButton
          icon={<BsLaptop size={20} />}
          tooltip="Active Device"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <span className="absolute top-[5px] right-[5px] bg-red-500 text-white text-[10px] w-[15px] h-[15px] flex justify-center items-center rounded-full">
          {selectedDevicesCount()}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-1 w-[300px] bg-white border border-gray-300 shadow-md z-10 ${dropdownPosition} p-2 rounded-md`}
          >
            <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
              {selectedDevices.length === 0 && (
                <span className="text-[14px] text-gray-400">
                  No devices selected
                </span>
              )}
              {selectedDevices.map((device) => (
                <div
                  key={device.id}
                  className="px-2 py-2 hover:bg-gray-100 rounded-md select-none flex justify-between items-center gap-2 cursor-pointer group"
                >
                  <span className="text-[14px] text-gray-500 group-hover:text-gray-800">
                    {device.name}
                  </span>
                  <div>
                    <CgCloseO
                      size={18}
                      className="text-gray-400"
                      onClick={() => removeDevice(device.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="w-full text-center bg-black text-white p-2 rounded-xl text-[14px] mt-2 cursor-pointer hover:bg-gray-800 transition-colors duration-100"
              onClick={() => {
                setIsOpen(false);
                setShowAddDeviceModal(true);
              }}
            >
              Add new device
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectedDeviceButton;
