import { createContext, useEffect, useReducer, useState } from "react";
const isDev = process.env.NODE_ENV === "development";

import { devices } from "../constants/devices";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([
    { ...devices.mobile[0], id: "mobile-1" },
    { ...devices.mobile[3], id: "mobile-4" },
    { ...devices.tablets[0], id: "tablet-1" },
    { ...devices.computers[0], id: "computer-1" },
    { ...devices.computers[4], id: "computer-5" },
  ]);
  const [deviceSettings, setDeviceSettings] = useState(
    selectedDevices.reduce((acc, device) => {
      acc[device.id] = {
        isCSSEnabled: true,
        isJSEnabled: true,
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    const URL = isDev ? "https://example.com/" : window.location.href;
    setUrl(URL);
  }, []);

  const handleAddNewDevice = (device) => {
    const deviceId = Math.random().toString(36).substr(2, 9);
    setSelectedDevices((prevDevices) => [
      ...prevDevices,
      {
        ...device,
        id: deviceId,
      },
    ]);

    setDeviceSettings((prevSettings) => ({
      ...prevSettings,
      [deviceId]: {
        isCSSEnabled: true,
        isJSEnabled: true,
      },
    }));
  };

  const removeDevice = (deviceId) => {
    setSelectedDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== deviceId)
    );
  };

  const contextValue = {
    devices,
    url,
    setUrl,
    selectedDevices,
    setSelectedDevices,
    showAddDeviceModal,
    setShowAddDeviceModal,
    deviceSettings,
    setDeviceSettings,
    handleAddNewDevice,
    removeDevice,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
