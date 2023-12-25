import * as actions from "./actionTypes";

export const changeTheme = (theme = "") => {
    // Save or change theme mode in LocalStorage
    localStorage.setItem("website-theme-mode", JSON.stringify({value: theme}));

    return {
        type: actions.CHANGE_THEME,
        payload: {
            theme: theme
        }
    }
};