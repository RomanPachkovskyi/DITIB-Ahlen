import { createRoot } from "react-dom/client";
/* latin + latin-ext only — no cyrillic/greek/vietnamese subsets needed */
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-ext-300.css";
import "@fontsource/inter/latin-300-italic.css";
import "@fontsource/inter/latin-ext-300-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-ext-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-ext-600.css";
import "@fontsource/inter/latin-600-italic.css";
import "@fontsource/inter/latin-ext-600-italic.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-ext-700.css";
import "@fontsource/inter/latin-800.css";
import "@fontsource/inter/latin-ext-800.css";
import "@fontsource/inter/latin-900.css";
import "@fontsource/inter/latin-ext-900.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
