const PlaceToVisitReducer = (
  state = { placesToVisitData: [], isLoaded: false },
  action
) => {
  switch (action.type) {
    case "GET_PLACES_TOVISIT":
      return { ...state, placesToVisitData: action.payload, isLoaded: true };
    case "ADD_PLACES_TOVISIT":
      return {
        ...state,
        placesToVisitData: [...state.placesToVisitData, action.payload],
      };
    default:
      return state;
  }
};

export default PlaceToVisitReducer;
