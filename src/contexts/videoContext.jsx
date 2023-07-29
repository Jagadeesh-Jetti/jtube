import { createContext, useReducer } from "react";
import { initialState, videoReducer } from "../reducers/reducer";

export const videoContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const inWatchlater = (id) => {
    return state.watchLater.find(({ _id }) => _id === id);
  };

  const values = { state, dispatch, inWatchlater };
  return (
    <videoContext.Provider value={values}>{children}</videoContext.Provider>
  );
};
