import React, { createContext, useState } from "react";
import Loading from "../components/Loading";

interface LoadingContextData {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const IsLoadingContext = createContext({} as LoadingContextData);

export const IsLoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <IsLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <Loading />}
    </IsLoadingContext.Provider>
  );
};
