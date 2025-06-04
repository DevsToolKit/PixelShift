import { injectVisionStyles } from "./visionStyles";

/**
 * Sets up iframe event listeners for scroll and click events.
 * @param {HTMLIFrameElement} iframe - The iframe element.
 * @param {Function} onScroll - Scroll callback.
 * @param {Function} onClick - Click callback.
 * @param {string} visionDifficulty - Vision difficulty level.
 */
export const setupIframeListeners = (
  iframe,
  onScroll,
  onClick,
  visionDifficulty
) => {
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;

  if (iframeDoc) {
    const applyStyles = () => {
      injectVisionStyles(iframeDoc, visionDifficulty);
    };

    const handleScroll = () => {
      const scrollTop = iframeDoc.documentElement.scrollTop;
      const scrollLeft = iframeDoc.documentElement.scrollLeft;
      onScroll(scrollTop, scrollLeft);
    };

    const handleClick = (event) => {
      const { clientX, clientY, target } = event;
      const tagName = target.tagName;
      onClick(clientX, clientY, tagName);
    };

    iframe.onload = applyStyles;
    applyStyles();

    iframeDoc.addEventListener("scroll", handleScroll);
    iframeDoc.addEventListener("click", handleClick);

    return () => {
      iframeDoc.removeEventListener("scroll", handleScroll);
      iframeDoc.removeEventListener("click", handleClick);
    };
  }
};
