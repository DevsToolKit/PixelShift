import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deviceCategories, devices } from "../../constants/devices";

function AddNewDeviceModal() {
  const { showAddDeviceModal, setShowAddDeviceModal, handleAddNewDevice } =
    useContext(AppContext);
  const [active, setActive] = useState("all");
  const [filteredDevices, setFilteredDevices] = useState([
    ...devices.mobile,
    ...devices.tablets,
    ...devices.computers,
  ]);

  const handleDeviceFilter = (category) => {
    setActive(category);
    // Correct the category key by converting plural to singular
    const categoryMap = {
      all: "all",
      mobiles: "mobile",
      tablets: "tablets",
      computers: "computers",
    };

    if (category === "all") {
      setFilteredDevices([
        ...devices.mobile,
        ...devices.tablets,
        ...devices.computers,
      ]);
    } else {
      setFilteredDevices(devices[categoryMap[category]]);
    }
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowAddDeviceModal(false);
    }
  };

  return (
    <section
      className="fixed top-0 left-0 h-full w-full bg-black/30 z-[99999] flex justify-center items-center"
      onClick={handleContainerClick}
    >
      <div
        className="w-[1200px] max-h-[700px] h-full bg-white rounded-xl shadow-xl flex overflow-hidden py-5"
        // onClick={handleModalContentClick}
      >
        <div className="w-full max-w-[25%] h-full p-5">
          <h3 className="text-md text-primary-text font-semibold">Templates</h3>
          <div className="mt-3 w-full h-fit flex flex-col gap-1">
            {deviceCategories.map((category) => (
              <ul
                key={category.id}
                className={`p-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-300 ${
                  active === category.id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleDeviceFilter(category.id)}
              >
                <li>{category.name}</li>
              </ul>
            ))}
          </div>
        </div>
        <div className="px-5 w-full h-full overflow-y-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-md text-primary-text font-semibold">
              Select Device Template
            </h3>
            <p>{filteredDevices.length} Templates</p>
          </div>
          <div className="w-full h-full grid grid-cols-3 mt-5 gap-5 ">
            {filteredDevices.map((device, key) => (
              <div
                className="h-[300px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer rounded-xl hover:scale-105 hover:bg-gray-200  transition-all duration-300"
                key={key}
                onClick={() => handleAddNewDevice(device)}
              >
                <div>
                  {device.category === "Mobile" ? (
                    <img
                      src="https://imgur.com/payhQgd"
                      className="w-[200px]"
                      alt=""
                    />
                  ) : device.category === "Tablet" ? (
                    <img
                      src="https://imgur.com/j6rSNUp"
                      className="w-[200px]"
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://imgur.com/YvQNy4L"
                      className="w-[200px]"
                      alt=""
                    />
                  )}
                </div>
                <span className="mt-2 text-center">{device.name}</span>
                <span className="mt-2 text-center text-sm text-gray-600">
                  {device.width} x {device.height} px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNewDeviceModal;
