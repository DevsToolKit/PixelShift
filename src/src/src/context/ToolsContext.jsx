import { createContext, useReducer, useState } from "react";

const ToolsContext = createContext();

const initialState = {
  isSyncActive: false,
  listOfActiveDevices: [],
  isDevConsoleActive: false,
  isVerticalOrientation: false,
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
    case "TOGGLE_LAYOUT":
      return { ...state, isVerticalOrientation: !state.isVerticalOrientation };
    case "SET_RESIZE_PERCENTAGE":
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
