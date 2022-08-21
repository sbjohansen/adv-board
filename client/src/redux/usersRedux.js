const createActionName = (actionName) => `app/users/${actionName}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = (payload) => ({ type: LOG_IN, payload});

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default usersReducer;