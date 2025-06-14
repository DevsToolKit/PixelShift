import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Renderer from "./Renderer";
import Tools from "./Tools";

import { AppContext } from "../../context/AppContext";
import { ToolsContext } from "../../context/ToolsContext";
import { useTools } from "../../hooks/useTool";

import {
  takeFullScreenshot,
  takeViewportScreenshot,
} from "../../utils/screenshotUtils";

function DeviceContainer() {
  const { selectedDevices, url, deviceSettings, setDeviceSettings } =
    useContext(AppContext);

  const { resizePercentage, isVerticalOrientation, isSyncActive } = useTools();

  const scale = useMemo(() => resizePercentage / 100, [resizePercentage]);
  const [deviceDimensions, setDeviceDimensions] = useState({});
  const iframeRefs = useRef({});

  const handleScrollSync = useCallback(
    (scrolledDeviceId, scrollTop, scrollLeft) => {
      if (!isSyncActive) return;

      Object.entries(iframeRefs.current).forEach(([deviceId, iframeRef]) => {
        if (deviceId !== scrolledDeviceId && iframeRef?.contentWindow) {
          iframeRef.contentWindow.document.documentElement.scrollTo(
            scrollLeft,
            scrollTop
          );
        }
      });
    },
    [isSyncActive]
  );

  const updateVisionDifficulty = (deviceId, difficulty) => {
    setDeviceSettings((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        visionDifficulty: difficulty,
      },
    }));
  };

  const takeScreenshot = async (device, type) => {
    try {
      const iframeRef = iframeRefs.current[device.id];
      if (!iframeRef) {
        console.warn(`Iframe ref not found for device: ${device.name}`);
        return;
      }

      console.log(
        `Taking ${type === "viewport" ? "viewport" : "full"} screenshot for: ${device.name}`
      );

      if (type === "viewport") {
        await takeViewportScreenshot(iframeRef, device);
      } else {
        await takeFullScreenshot(iframeRef, device);
      }
    } catch (error) {
      console.error(
        `Error taking ${type} screenshot for: ${device.name}`,
        error
      );
    }
  };

  return (
    <div className="flex w-full h-full overflow-auto">
      <div
        className={`w-full flex flex-wrap gap-5 p-4 pb-10 h-full scroll-container ${
          isVerticalOrientation ? "flex-col" : ""
        }`}
      >
        {selectedDevices.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>
              Please add devices to see them here, you can click on the add
              device button in the header to add new devices.
            </p>
          </div>
        ) : (
          selectedDevices.map((device) => {
            const dimensions = deviceDimensions[device.id] || {
              width: device.width,
              height: device.height,
            };

            return (
              <div
                key={device.id}
                className="relative mb-10"
                style={{
                  width: `${dimensions.width * scale}px`,
                  height: `${dimensions.height * scale}px`,
                }}
              >
                <div className="flex flex-col">
                  <Tools
                    device={device}
                    setVisionDifficulty={(difficulty) =>
                      updateVisionDifficulty(device.id, difficulty)
                    }
                    takeScreenshot={(type) => takeScreenshot(device, type)}
                  />
                  <Renderer
                    device={device}
                    scale={scale}
                    iframeRef={(ref) => (iframeRefs.current[device.id] = ref)}
                    url={url}
                    onScroll={(scrollTop, scrollLeft) =>
                      handleScrollSync(device.id, scrollTop, scrollLeft)
                    }
                    visionDifficulty={
                      deviceSettings[device.id]?.visionDifficulty || "default"
                    }
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DeviceContainer;
