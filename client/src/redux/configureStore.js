import { applyMiddleware, createStore, combineReducers } from 'redux';
// import { Reducer, initialState } from './reducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducers/Auth';
import LoadingReducer from './reducers/Loading';
import PlaceReducer from './reducers/Places';
import PlaceToVisitReducer from './reducers/PlacesToVisit';
import thunk from 'redux-thunk';


const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: AuthReducer,
      loading: LoadingReducer,
      places : PlaceReducer,
      placesToVisit : PlaceToVisitReducer
    }), // reducer
    // applyMiddleware(thunk)
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
