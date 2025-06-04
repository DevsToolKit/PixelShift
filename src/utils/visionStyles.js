// Constant for vision difficulty settings
export const VISION_DIFFICULTY_SETTINGS = [
  { id: "default", name: "Default", description: "No visual modifications." },
  {
    id: "deuteranopia",
    name: "Deuteranopia",
    description: "Simulates difficulty distinguishing red and green hues.",
  },
  {
    id: "protanopia",
    name: "Protanopia",
    description: "Simulates red-blindness.",
  },
  {
    id: "tritanopia",
    name: "Tritanopia",
    description: "Simulates blue-blindness.",
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    description: "Applies high contrast for better readability.",
  },
  {
    id: "night-mode",
    name: "Night Mode",
    description: "Dark mode for reduced strain in low-light environments.",
  },
  {
    id: "low-vision",
    name: "Low Vision",
    description: "Increases font size and line height for easier readability.",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Converts the content to grayscale.",
  },
  {
    id: "blurred-vision",
    name: "Blurred Vision",
    description: "Simulates difficulty focusing by applying a blur effect.",
  },
  {
    id: "high-brightness",
    name: "High Brightness",
    description: "Simulates an excessively bright screen.",
  },
];

// Function to inject vision difficulty-based styles into the iframe
export const injectVisionStyles = (iframeDoc, visionDifficulty) => {
  if (!iframeDoc) return;

  // Remove previous vision difficulty styles by targeting the specific ID
  const existingStyleTag = iframeDoc.querySelector(
    "#PIXLESHIFT_PB_VISION_STYLES"
  );
  if (existingStyleTag) {
    existingStyleTag.remove();
  }

  // Create a new style tag to inject vision difficulty styles
  const styleTag = iframeDoc.createElement("style");
  styleTag.id = "PIXLESHIFT_PB_VISION_STYLES"; // Assign a unique ID to the style tag
  iframeDoc.head.appendChild(styleTag);

  switch (visionDifficulty) {
    case "deuteranopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(90deg);
          }
        `;
      break;

    case "protanopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(180deg);
          }
        `;
      break;

    case "tritanopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(270deg);
          }
        `;
      break;

    case "high-contrast":
      styleTag.innerHTML = `
          body {
            background-color: black !important;
            color: white !important;
            filter: contrast(200%) !important;
          }
          a {
            color: yellow !important;
          }
        `;
      break;

    case "night-mode":
      styleTag.innerHTML = `
          body {
            background-color: #121212 !important;
            color: #E0E0E0 !important;
          }
          a {
            color: #BB86FC !important;
          }
        `;
      break;

    case "low-vision":
      styleTag.innerHTML = `
          body {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
        `;
      break;

    case "monochrome":
      styleTag.innerHTML = `
          body {
            filter: grayscale(100%);
          }
        `;
      break;

    case "blurred-vision":
      styleTag.innerHTML = `
          body {
            filter: blur(2px);
          }
        `;
      break;

    case "high-brightness":
      styleTag.innerHTML = `
          body {
            filter: brightness(150%);
          }
        `;
      break;

    case "none":
    default:
      // No styles applied
      break;
  }
};
