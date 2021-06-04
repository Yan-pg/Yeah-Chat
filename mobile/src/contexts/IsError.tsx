import React, { createContext, useState } from "react";
import ModalError from "../components/ModaError";

interface ErrorContextData {
  isError: boolean;
  setError: (error: boolean, sub: string) => void;
}

export const IsErrorContext = createContext({} as ErrorContextData);

export const IsErrorProvider: React.FC = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [subTitle, setSubTitle] = useState("");

  const setError = (error: boolean, sub: string) => {
    setIsError(error);
    setSubTitle(sub);
  };

  return (
    <IsErrorContext.Provider value={{ isError, setError }}>
      <>
        {children}
        {isError && <ModalError subTitle={subTitle} />}
      </>
    </IsErrorContext.Provider>
  );
};
