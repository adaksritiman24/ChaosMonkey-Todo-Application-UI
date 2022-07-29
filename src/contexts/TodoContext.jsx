import { createContext } from "react";

const initialContextValue = {
    state : null,
    dispatch : ()=> {}
}

const TodoContext = createContext(initialContextValue);

export default TodoContext;