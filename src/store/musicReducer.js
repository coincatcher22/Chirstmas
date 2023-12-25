import * as actions from "./actions/actionTypes";

const  initialState = {
    play: true,
};

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PLAY_MUSIC:
            return {
                ...state,
               play: true,
            };
        case actions.STOP_MUSIC:
            return {
                ...state,
                play: false
            };
        default:
            return state
    }
}

export default musicReducer;