import * as api from "../api/index.js";

export const getPlacesVisited = () => async (dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.fetchPlacesVisited();
    const action = { type: "GET_PLACES_VISITED", payload: data };
    dispatch(action);
    dispatch(ChangeLoadingStatus(false));
  } catch (error) {
    console.log(error.message);
    dispatch(ChangeLoadingStatus(false));
  }
};

export const addPlacesVisited = (place) => async (dispatch) => {
  console.log(place);
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.createPlacesVisited(place);
    dispatch({ type: "ADD_PLACES_VISITED", payload: data });
    dispatch(ChangeLoadingStatus(false));
    window.location.href="/dashboard";
  } catch (error) {
    console.log(error);
    dispatch(ChangeLoadingStatus(false));
  }
};

export const uploadFile = (obj) => async(dispatch) => {
  const data = await api.uploadFile(obj);
  console.log(data);
}

export const removePlaceVisited = (placeId) => async(dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.deletePlacesVisited(placeId);
    dispatch({ type: "GET_PLACES_VISITED", payload: data });
    dispatch(ChangeLoadingStatus(false));
  } catch (error) {
    console.log(error);
    dispatch(ChangeLoadingStatus(false));
  }
}

export const ChangeLoadingStatus = (dat) => ({
  type: "CHANGE_LOADING_STATUS",
  payload: dat,
});
