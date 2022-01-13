const PlaceReducer = (state= {placeData: null}, action) => {
    switch (action.type) {
        case 'GET_PLACES':
            return { ...state, placeData: action.payload};
        default:
            return state;
    }
}

export default PlaceReducer;