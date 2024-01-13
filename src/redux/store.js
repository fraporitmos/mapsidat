import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import placesReducer from "./reducers";
import { persistReducer , persistStore} from "redux-persist";
import { thunk } from "redux-thunk";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    places: placesReducer,
    user_firebase: placesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const Store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(Store)