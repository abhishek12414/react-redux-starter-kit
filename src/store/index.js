import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'react-redux-starter-kit',
	storage: storage,
};

const pReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
	typeof window === 'object' && process.env.NODE_ENV === 'development' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		})
		: compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
	// other store enhancers if any
);

const store = createStore(pReducer, enhancer);
const persistor = persistStore(store);

export { persistor, store }
