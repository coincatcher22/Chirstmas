import * as actions from "./actions/actionTypes";

let themeMode = null;
const isThemeMode = localStorage.getItem("website-theme-mode");

if(isThemeMode) {
    themeMode = JSON.parse(isThemeMode).value;
}

const  initialState = {
    theme: isThemeMode ? themeMode : "light",
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload.theme,
            };
        default:
            return state
    }
}

export default themeReducer