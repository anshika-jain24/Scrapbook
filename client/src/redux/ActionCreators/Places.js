import * as api from "../api/index.js";

export const getPlaces = () => async (dispatch) => {
  try {
    dispatch(ChangeLoadingStatus(true));
    const { data } = await api.fetchPlaces();
    const action = { type: "GET_PLACES", payload: data };
    dispatch(action);
    dispatch(ChangeLoadingStatus(false));
  } catch (error) {
    console.log(error.message);
    dispatch(ChangeLoadingStatus(false));
  }
};

export const ChangeLoadingStatus = (dat) => ({
  type: "CHANGE_LOADING_STATUS",
  payload: dat,
});
