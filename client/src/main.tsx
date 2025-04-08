import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add FontAwesome styles
const fontAwesomeCSS = document.createElement("link");
fontAwesomeCSS.rel = "stylesheet";
fontAwesomeCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesomeCSS);

// Add Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(googleFonts);

// Add meta title
const title = document.createElement("title");
title.textContent = "Calm Corners - Find Your Perfect Study Space";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
