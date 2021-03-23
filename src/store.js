import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './logic/reducers';
import mainSaga from './logic/sagas';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    
    let composeEnhancers = compose;

    if (process.env.NODE_ENV === 'development') {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    };

    const store = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )(createStore)(reducer);

    sagaMiddleware.run(mainSaga);

    return {
        store
    };
};