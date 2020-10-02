import { createContext, useContext } from "react";
import menuStore from "./menuStore";
import userStore from "./userStore";

const stores = () => ({
  menu: menuStore(),
  user: userStore(),
});

const StoresProviderContext = createContext();

const useStores = () => useContext(StoresProviderContext);

const StoresProvider = ({ children }) => (
  <StoresProviderContext.Provider value={stores()}>
    {children}
  </StoresProviderContext.Provider>
);

export { StoresProviderContext, StoresProvider, useStores };
