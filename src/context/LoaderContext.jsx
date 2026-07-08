// context/LoaderContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { registerLoader } from "../utils/loaderController";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  useEffect(() => {
    registerLoader(show, hide);
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        show,
        hide,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }

  return context;
};