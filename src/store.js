import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import reducer from './logic/reducers';
import mainSaga from './logic/sagas';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    
    const persistConfig = {
        key: "root",
        storage,
        stateReconciler: autoMergeLevel2,
        //blacklist no guarda
        //whitelist sí guarda
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    let composeEnhancers = compose;

    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    };

    const store = composeEnhancers(applyMiddleware(sagaMiddleware))(createStore)(
        persistedReducer
    );

    const persistor = persistStore(store);

    sagaMiddleware.run(mainSaga);

    return {
        persistor, store
    };
};