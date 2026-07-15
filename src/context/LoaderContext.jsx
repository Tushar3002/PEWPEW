// context/LoaderContext.jsx

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { registerLoader } from "../utils/loaderController";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const show = useCallback(() => setLoading(true), []);
  const hide = useCallback(() => setLoading(false), []);

  useEffect(() => {
    registerLoader(show, hide);

    return () => {
      registerLoader(() => {}, () => {});
    };
  }, [show, hide]);

  const value = useMemo(
    () => ({
      loading,
      show,
      hide,
    }),
    [loading, show, hide]
  );

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
};

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }

  return context;
};