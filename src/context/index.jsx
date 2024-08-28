import { useContext, createContext, useReducer } from "react";

const Context = createContext();
export const ContextProvider = ({ initialState, reducer, children }) => {
  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
