import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaLock, FaUnlock, FaGithub } from "react-icons/fa";
import HeaderButton from "../ui/HeaderButton";
import { ToolsContext } from "../../context/ToolsContext";
import { PiMouseScroll } from "react-icons/pi";
import { BsLaptop } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
import { LuGalleryHorizontalEnd } from "react-icons/lu";

import SelectedDeviceButton from "../headerComponents/SelectedDeviceButton";

function Header() {
  const { url } = useContext(AppContext);
  const { toolsState, dispatch } = useContext(ToolsContext);

  const checkForSSL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  return (
    <header className="w-full bg-gray-100 p-5 flex justify-center items-center gap-3">
      <div className="w-full px-5 py-2 border-[1px] border-gray-300 rounded-full flex justify-start items-center">
        {checkForSSL(url) ? (
          <FaLock className="inline-block mr-2 text-green-500" />
        ) : (
          <FaUnlock className="inline-block mr-2 text-red-500" />
        )}
        <span className="text-[12px] select-none">{url}</span>
      </div>
      <HeaderTools toolsState={toolsState} dispatch={dispatch} />
    </header>
  );
}

const HeaderTools = ({ toolsState, dispatch }) => {
  const handleResizeChange = (event) => {
    dispatch({ type: "SET_RESIZE_PERCENTAGE", payload: event.target.value });
  };

  return (
    <div className="flex gap-1">
      <HeaderButton
        icon={<PiMouseScroll size={20} />}
        onClick={() => dispatch({ type: "TOGGLE_SYNC" })}
        isActive={toolsState.isSyncActive}
        tooltip="Toggle Sync Scroll"
      />
      <SelectedDeviceButton />
      <HeaderButton
        icon={
          <LuGalleryHorizontalEnd
            size={20}
            className={`${
              !toolsState.isVerticalOrientation ? "rotate-[-90deg]" : ""
            } transition-transform duration-200`}
          />
        }
        onClick={() => dispatch({ type: "TOGGLE_LAYOUT" })}
        isActive={toolsState.isVerticalOrientation}
        tooltip="Toggle orientation"
      />
      {/* <HeaderButton
        icon={<BsLaptop size={20} />}
        tooltip="Toggle Dev Console"
        isActive={toolsState.isDevConsoleActive}
        onClick={() => dispatch({ type: "TOGGLE_DEV_CONSOLE" })}
      /> */}
      <div className="flex items-center gap-2 mr-2">
        <input
          type="range"
          min="50"
          max="100"
          step="5"
          className="w-20 h-2 bg-gray-300 rounded-full"
          style={{ outline: "none" }}
          value={toolsState.resizePercentage}
          onChange={handleResizeChange}
        />
        <span>{toolsState.resizePercentage}%</span>
      </div>
      <HeaderButton
        icon={<FaGithub size={20} />}
        onClick={() =>
          window.open(
            "https://github.com/DevsToolKit/PixelShift",
            "_blank",
            "noopener,noreferrer"
          )
        }
        tooltip="Contribute on GitHub"
      />
      <HeaderButton
        variant="danger"
        icon={<CgCloseO size={20} />}
        tooltip="Exit"
        isActive={toolsState.isDevConsoleActive}
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default Header;
