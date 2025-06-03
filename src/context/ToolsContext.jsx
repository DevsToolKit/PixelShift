import { createContext, useReducer, useState } from "react";

const ToolsContext = createContext();

const initialState = {
  isSyncActive: false,
  listOfActiveDevices: [],
  isDevConsoleActive: false,
  dashboardLayout: "vertical",
  resizePercentage: 100,
};

const toolsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SYNC":
      return { ...state, isSyncActive: !state.isSyncActive };
    case "SET_DEVICES":
      return { ...state, listOfActiveDevices: action.payload };
    case "TOGGLE_DEV_CONSOLE":
      return { ...state, isDevConsoleActive: !state.isDevConsoleActive };
    case "SET_LAYOUT":
      return { ...state, dashboardLayout: action.payload };
    case "SET_ZOOM":
      return { ...state, resizePercentage: action.payload };
    default:
      return state;
  }
};

const ToolsContextProvider = ({ children }) => {
  const [toolsState, dispatch] = useReducer(toolsReducer, initialState);

  return (
    <ToolsContext.Provider value={{ toolsState, dispatch }}>
      {children}
    </ToolsContext.Provider>
  );
};

export { ToolsContext, ToolsContextProvider };
