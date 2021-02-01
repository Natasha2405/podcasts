// initial state
const initState = {
    podcasts: []
};

// constants
const GET_PODCASTS = 'GET_PODCASTS';

// actions
export const getPodcasts = (podcasts) => {
    return {
        type: GET_PODCASTS,
        payload: podcasts
    };
};

// reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PODCASTS:
            return {
                ...state, 
                podcasts: action.payload
            }
        default:
            return state;
    };
};

export default reducer; 