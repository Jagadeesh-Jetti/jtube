import { videos } from "../backend/videos";

export const initialState = {
  watchLater: [],
};

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LATER": {
      const filteredVideo = videos.find(({ _id }) => _id === action.payload);
      return {
        ...state,
        watchLater: [...state.watchLater, filteredVideo],
      };
    }

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          (video) => video.id !== action.payload.id
        ),
      };
    case "CLEAR_WATCH_LATER":
      return {
        ...state,
        watchLater: [],
      };
    default:
      return state;
  }
};
