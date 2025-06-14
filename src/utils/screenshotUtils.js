import html2canvas from "html2canvas-pro";

/**
 * Takes a viewport screenshot of the iframe.
 * @param {HTMLIFrameElement} iframe - The iframe element.
 * @param {Object} device - Device details.
 */
export const takeViewportScreenshot = async (iframe, device) => {
  if (!iframe) throw new Error("Iframe not accessible");

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const iframeBody = iframeDoc.body;

  const scrollTop = iframeDoc.documentElement.scrollTop;
  const scrollLeft = iframeDoc.documentElement.scrollLeft;

  const canvas = await html2canvas(iframeBody, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: "#fff",
    width: iframe.offsetWidth,
    height: iframe.offsetHeight,
    x: scrollLeft,
    y: scrollTop,
  });

  const screenshotDataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = screenshotDataUrl;
  link.download = `${device.name}-viewport-screenshot.png`;
  link.click();
};

/**
 * Takes a full-page screenshot of the iframe.
 * @param {HTMLIFrameElement} iframe - The iframe element.
 * @param {Object} device - Device details.
 */
export const takeFullScreenshot = async (iframe, device) => {
  if (!iframe) throw new Error("Iframe not accessible");

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const iframeBody = iframeDoc.body;

  const canvas = await html2canvas(iframeBody, {
    allowTaint: true,
    useCORS: true,
    backgroundColor: "#fff",
    width: iframeDoc.documentElement.scrollWidth,
    height: iframeDoc.documentElement.scrollHeight,
  });

  const screenshotDataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = screenshotDataUrl;
  link.download = `${device.name}-full-screenshot.png`;
  link.click();
};
