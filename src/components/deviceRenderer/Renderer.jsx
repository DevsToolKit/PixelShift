import React, { useContext, useEffect, useRef, useState } from "react";
import { setupIframeListeners } from "../../utils/iframeUtils";

function Renderer({
  device,
  scale,
  iframeRef,
  url,
  onScroll,
  visionDifficulty,
}) {
  const [iframeSrc, setIframeSrc] = useState("");
  const containerRef = useRef(null);
  const iframeInternalRef = useRef(null);

  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    } else {
      setIframeSrc("");
    }
  }, [url]);

  useEffect(() => {
    const iframe = iframeInternalRef.current;
    const cleanup = setupIframeListeners(
      iframe,
      onScroll,
      () => {},
      visionDifficulty
    );
    return cleanup;
  }, [onScroll, visionDifficulty]);

  useEffect(() => {
    console.log(visionDifficulty);
  }, [visionDifficulty]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${device.width}px`,
        height: `${device.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "relative",
      }}
    >
      <div className="flex flex-row justify-between items-center mb-1">
        <h3 className="text-primary-text text-[12px]">{device.name}</h3>
        <span className="text-secondary-text text-[12px]">
          @ {device.width} x {device.height} px
        </span>
      </div>
      <div
        style={{
          width: `${device.width}px`,
          height: `${device.height}px`,
          border: "1px solid #ccc",
          borderRadius: "5px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            title={device.name}
            ref={(ref) => {
              iframeInternalRef.current = ref;
              if (iframeRef) iframeRef(ref);
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${device.width}px`,
              height: `${device.height}px`,
              border: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Renderer;
