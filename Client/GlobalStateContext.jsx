// GlobalStateContext.js
import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  scannedQRCode: null,
  history: [],
};

// Actions
const SET_SCANNED_QR_CODE = "SET_SCANNED_QR_CODE";
const ADD_TO_HISTORY = "ADD_TO_HISTORY";

// Reducer function
function globalStateReducer(state, action) {
  switch (action.type) {
    case SET_SCANNED_QR_CODE:
      return { ...state, scannedQRCode: action.payload };
    case ADD_TO_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
}

// Create the context
const GlobalStateContext = createContext();

// Context provider
function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}

export {
  GlobalStateProvider,
  useGlobalState,
  SET_SCANNED_QR_CODE,
  ADD_TO_HISTORY,
};


