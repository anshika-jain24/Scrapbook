const PlaceToVisitReducer = (
  state = { placesToVisitData: [], geoJsonData: [] },
  action
) => {
  switch (action.type) {
    case "GET_PLACES_TOVISIT":
      return { ...state, placesToVisitData: action.payload };
    case "ADD_PLACES_TOVISIT":
      return {
        placesToVisitData: [...state.placesToVisitData, action.payload],
      };
    default:
      return state;
  }
};

export default PlaceToVisitReducer;
