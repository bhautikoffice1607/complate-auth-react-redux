import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import postReducer from './postReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});
