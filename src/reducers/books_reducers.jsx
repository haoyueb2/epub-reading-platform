import ACTIONS from "../actions/books_actions";
import _ from "lodash";

const defaultState = {
    items: []
};

const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.CREATE_ITEM: {
            console.log(action);
            let newState = _.cloneDeep(state);
            return newState;
        }


        default:
            return state;
    }
};

export default todoReducer;
