const PlaceVisitedReducer = (
  state = { placesVisitedData: [], isLoaded: false },
  action
) => {
  switch (action.type) {
    case "GET_PLACES_VISITED":
      return { ...state, placesVisitedData: action.payload, isLoaded: true };
    case "ADD_PLACES_VISITED":
      return {
        ...state,
        placesVisitedData: [...state.placesVisitedData, action.payload],
      };
    default:
      return state;
  }
};

export default PlaceVisitedReducer;
