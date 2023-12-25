import * as actions from "./actionTypes";

export const playMusic = () => {
    return {
        type: actions.PLAY_MUSIC,
    }
};

export const stopMusic = () => {
    return {
        type: actions.STOP_MUSIC,
    }
};