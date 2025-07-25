import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.tsx";

import "./index.css";
import "@fontsource/noto-sans-jp/300.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
