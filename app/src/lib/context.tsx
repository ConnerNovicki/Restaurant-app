import React, { createContext, useReducer } from 'react';
import storeReducer, { initialState } from './reducer';
import { Action, State } from './reducer';

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };

export interface IStoreContext {
  dispatch: (action: Action<any>) => {};
  state: State;
}
