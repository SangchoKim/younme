import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modules from './modules';
import rootSaga from '../sagas';

const prod = process.env.NODE_ENV === 'production';

const configure = () => {
  const sagaMiddleware = createSagaMiddleware(); 
  const middlewares = [sagaMiddleware];
  const devTools = compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const store = prod ? createStore(modules, compose(applyMiddleware(...middlewares))) : createStore(modules, compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configure;