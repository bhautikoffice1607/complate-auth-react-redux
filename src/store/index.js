import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fire from '../Firebase/Firebase';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import rootReducer from './reducers';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    reactReduxFirebase(fire, rrfConfig),
    reduxFirestore(fire),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

export default store;
