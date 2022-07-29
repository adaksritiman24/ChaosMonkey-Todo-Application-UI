import { ACTIONS } from "../constants/actions";

const todoReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.CHANGE_SCOPE:
            return {...state, scope : action.payload}
        case ACTIONS.SET_IS_CREATE_TODO_MODAL_OPEN:
            return {...state, isCreateTodoModalOpen : action.payload}  
        case ACTIONS.SET_TODOS:
            return {...state, todos: action.payload}      
        default:
            return state;
    }
}

export default todoReducer;