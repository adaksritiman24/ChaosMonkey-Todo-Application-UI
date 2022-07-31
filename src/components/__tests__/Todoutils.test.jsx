import { fireEvent, render, screen } from "@testing-library/react";
import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
import CreateModal from "../CreateModal";
import Todoutils from "../Todoutils";
import { ACTIONS } from "../../constants/actions";

const dummyTodos = [
    {
        id : 1,
        title : "Dummy Title",
        body : "Dummy Body",
        completed : 0
    },
    {
        id : 2,
        title : "Dummy Title 2",
        body : "Dummy Body 2",
        completed : 1
    },
]

const dummyAppState = {
    todos : dummyTodos,
    scope : SCOPE.ALL,
    isUpdateTodoModalOpen : false
};
const dispatch = jest.fn();

const WithContext = (Application, modifiedState={})=> {
    const appState = {...dummyAppState, ...modifiedState}
    
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}


describe("Todoutils",  ()=> {
    it("Should not have Create Todo modal open", ()=> {
        render(WithContext(Todoutils));

        expect(screen.queryByTestId("title")).not.toBeInTheDocument();
        expect(screen.queryByTestId("body")).not.toBeInTheDocument();

    });

    it("Should have Create Todo modal open if isCreateTodoModalOpen state is true", ()=> {
        render(WithContext(Todoutils, {isCreateTodoModalOpen : true}));

        expect(screen.queryByTestId("title")).toBeInTheDocument();
        expect(screen.queryByTestId("body")).toBeInTheDocument();

    })

    it("should dispatch action when create todo button is clicked", ()=> {
        render(WithContext(Todoutils));

        const createButton = screen.getByTestId("todo-create-button");
        fireEvent.click(createButton);

        expect(dispatch).toBeCalledWith({
            type : ACTIONS.SET_IS_CREATE_TODO_MODAL_OPEN,
            payload: true,
        });
    
    });

    
})