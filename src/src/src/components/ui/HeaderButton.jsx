import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeaderButton({
  variant = "default",
  icon,
  onClick,
  isActive = false,
  tooltip,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative w-fit h-fit p-2 rounded-[12px] cursor-pointer transition-colors duration-200
        ${
          variant === "danger" ? "bg-red-200 text-red-800 hover:bg-red-300" : ""
        }
        ${isActive ? "bg-blue-300 text-blue-800" : "bg-gray-100 text-gray-700"}
        hover:bg-blue-200`}
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
    >
      {icon}

      <AnimatePresence>
        {showTooltip && tooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 p-2 text-xs bg-gray-800 text-white rounded shadow-sm z-50 whitespace-nowrap"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderButton;
