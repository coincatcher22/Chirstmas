import {combineReducers} from "redux";
// Reducers
import themeReducer from "./themeReducer";
import musicReducer from "./musicReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    music: musicReducer,
})


export default rootReducer;