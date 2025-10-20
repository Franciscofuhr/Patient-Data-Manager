import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PatientsProvider } from "./context/PatientsContext.tsx";
import { ToastProvider } from "./context/ToastContext/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <PatientsProvider>
        <App />
      </PatientsProvider>
    </ToastProvider>
  </StrictMode>
);
