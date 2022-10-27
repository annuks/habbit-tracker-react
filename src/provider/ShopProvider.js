
//code for implementing providers
import { createContext } from "react";
import { useProvideShop } from "../hooks";

const initialState = {
  habits: []
};

export const HabitContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const shop = useProvideShop();
  return <HabitContext.Provider value={shop}>{children}</HabitContext.Provider>;
};
