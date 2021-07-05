import { createContext, useContext, useState } from 'react';

export const OrdersContext = createContext();
export const useContextValue = () => {
  const [addedMeals, setAddedMeals] = useState([]);
  return { addedMeals: { value: addedMeals, set: setAddedMeals } };
};

export const useOrdersContext = () => {
  const ctx = useContext(OrdersContext);
  return ctx;
};
