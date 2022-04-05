import React, { createContext } from "react";
import Store from "./Store";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const storedData = Store();
  return (
    <StoreContext.Provider value={storedData}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
