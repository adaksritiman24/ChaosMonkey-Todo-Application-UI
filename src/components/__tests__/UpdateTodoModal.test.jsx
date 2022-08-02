import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UpdateTodoModal from "../UpdateTodoModal";
import { ACTIONS } from "../../constants/actions";
import { deleteTodo } from "../../utils/deleteTodo";

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
    isUpdateTodoModalOpen : true
};
const dispatch = jest.fn();

const WithContext = (Application, modifiedState={})=> {
    const appState = {...dummyAppState, ...modifiedState}
    
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}

jest.mock("../../utils/deleteTodo", ()=>{
    const actuals = jest.requireActual("../../utils/deleteTodo");
    return {
        ...actuals,
        __esModule : true,
        deleteTodo : jest.fn().mockImplementation(()=>Promise.resolve(1)),
    }
})

describe("UpdateTodoModal", ()=>{
    it("Should return empty react fragment when updatingtodo is undefined", ()=>{
        render(WithContext(UpdateTodoModal));

        expect(screen.queryByTestId("update-todo-modal")).not.toBeInTheDocument();
    })

    it("Should be in document and should match snapshot", ()=>{
        const {asFragment} = render(WithContext(UpdateTodoModal,{updatingTodo : dummyTodos[0]}));

        expect(screen.queryByTestId("update-todo-modal")).toBeInTheDocument();
        expect(asFragment).toMatchSnapshot();
    })

    it("should dispatch actions when modal is closed", ()=> {

        render(WithContext(UpdateTodoModal, {updatingTodo : dummyTodos[0]}));
        const cancelButtom = screen.getAllByRole("button")[1];

        fireEvent.click(cancelButtom);

        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toBeCalledWith({
            type : ACTIONS.SET_IS_UPDATE_TODO_MODAL_OPEN,
            payload : false,
        });

        expect(dispatch).toBeCalledWith({
            type : ACTIONS.SET_UPDATING_TODO,
            payload : undefined,
        })
    })
    

    it("Should dispatch action when delete button is clicked", async()=>{
        render(WithContext(UpdateTodoModal, {updatingTodo : dummyTodos[0]}));
        const deleteButton = screen.getAllByRole("button")[2];

        fireEvent.click(deleteButton);

        await waitFor(()=>{
            expect(dispatch).toBeCalledWith({
                type : ACTIONS.SET_TODOS,
                payload : [dummyTodos[1]]
            })
        })

    })
})