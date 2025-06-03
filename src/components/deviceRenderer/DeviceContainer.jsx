import React, { useContext, useMemo, useRef, useState } from "react";
import Renderer from "./Renderer";
import { AppContext } from "../../context/AppContext";
import { ToolsContext } from "../../context/ToolsContext";
import { useTools } from "../../hooks/useTool";
import Tools from "./Tools";

function DeviceContainer() {
  const { selectedDevices, url } = useContext(AppContext);
  const { resizePercentage } = useTools();

  const scale = useMemo(() => resizePercentage / 100, [resizePercentage]);
  const [deviceDimensions, setDeviceDimensions] = useState({});
  const iframeRefs = useRef({});
  const [visionDifficulties, setVisionDifficulties] = useState({});

  //   TODO: Move this to context
  const [verticalOrientation, setVerticalOrientation] = useState(false);
  return (
    <div className="flex w-full h-full overflow-auto">
      <div
        className={`w-full flex ${
          verticalOrientation ? "flex-col" : ""
        } flex-wrap gap-5 p-4 pb-10 h-full scroll-container`}
      >
        {selectedDevices.length === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <p>
              Please add devices to see them here, you can click on the add
              device button in the header to add new devices.
            </p>
          </div>
        )}
        {selectedDevices.map((device) => {
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
                <Tools device={device} />
                <Renderer
                  device={device}
                  scale={scale}
                  iframeRef={(ref) => (iframeRefs.current[device.id] = ref)}
                  url={url}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeviceContainer;
