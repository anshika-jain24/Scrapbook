import * as api from "../api/index.js";

export const getPlacesToVisit = () => async (dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.fetchPlacesToVisit();
    const action = { type: "GET_PLACES_TOVISIT", payload: data };
    dispatch(action);
    dispatch(ChangeLoadingStatus(false));
  } catch (error) {
    console.log(error.message);
    dispatch(ChangeLoadingStatus(false));
  }
};

export const addPlacesToVisit = (place) => async (dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.createPlacesToVisit(place);
    dispatch({ type: "ADD_PLACES_TOVISIT", payload: data });
    dispatch(ChangeLoadingStatus(false));
  } catch (error) {
    console.log(error);
    dispatch(ChangeLoadingStatus(false));
  }
};

export const removePlaceToVisit = (placeId) => async(dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.deletePlaceToVisit(placeId);
    dispatch({ type: "GET_PLACES_TOVISIT", payload: data });
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
