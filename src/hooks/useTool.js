// useTools.js
import { useContext } from "react";
import { ToolsContext } from "../context/ToolsContext";

export const useTools = () => {
  const { toolsState, dispatch } = useContext(ToolsContext);
  return {
    resizePercentage: toolsState.resizePercentage,
    isSyncActive: toolsState.isSyncActive,
    listOfActiveDevices: toolsState.listOfActiveDevices,
    isDevConsoleActive: toolsState.isDevConsoleActive,
    dashboardLayout: toolsState.dashboardLayout,
    dispatch,
  };
};
