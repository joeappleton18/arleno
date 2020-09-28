import { createContext, useContext } from "react";
import menuStore from "./menuStore";

const stores = () => ({
  menu: menuStore(),
});

const StoresProviderContext = createContext();

const useStores = () => useContext(StoresProviderContext);

const StoresProvider = ({ children }) => (
  <StoresProviderContext.Provider value={stores()}>
    {children}
  </StoresProviderContext.Provider>
);

export { StoresProviderContext, StoresProvider, useStores };
