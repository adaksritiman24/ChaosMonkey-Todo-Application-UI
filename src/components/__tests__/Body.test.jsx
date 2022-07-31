import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
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


describe("Body", ()=>{
    it("Should have All, completed and incomplete toggle buttons", ()=> {
        render(WithContext(Body));

        const scopeButtons = screen.getAllByRole("button");

        expect(scopeButtons[0]).toHaveTextContent("All");
        expect(scopeButtons[1]).toHaveTextContent("Completed");
        expect(scopeButtons[2]).toHaveTextContent("Incomplete");


    })

    it("Should not have UpdateModoModal component in default conditions", ()=> {
        render(WithContext(Body));

        expect(screen.queryByTestId("update-todo-modal")).not.toBeInTheDocument();
    });

    it("Should have UpdateModoModal component when updatingTodo is defined and isUpdateTodoModalOpen is true", ()=> {

        const updatingTodo = {
            id : 1,
            title : "Dummy Title",
            body : "Dummy Body",
            completed : 0
        }
        render(WithContext(Body, {isUpdateTodoModalOpen : true, updatingTodo}));

        expect(screen.queryByTestId("update-todo-modal")).toBeInTheDocument();
    });

    it("should change scope to completed when Completed toggle button is clicked", ()=> {
        render(WithContext(Body));
        

        const completedButton = screen.getAllByRole("button")[1]
        fireEvent.click(completedButton);

        expect(dispatch).toBeCalledWith(
            expect.objectContaining({
                type : ACTIONS.CHANGE_SCOPE,
                payload : "completed",
            })
        );
    })

    it("should match snapshot", ()=>{
        const { baseElement } = render(WithContext(Body));

        expect(baseElement).toMatchSnapshot();
    })
})