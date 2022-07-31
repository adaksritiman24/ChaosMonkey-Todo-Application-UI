import {act, render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import App from "../App";
import { SCOPE } from "../constants/constants";
import TodoContext from "../contexts/TodoContext";

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
    loading : false,
    scope : SCOPE.ALL,
    isUpdateTodoModalOpen : false,
    isCreateTodoModalOpen : false,
};
const dispatch = jest.fn();

const WithContext = (Application, modifiedState={})=> {
    const appState = {...dummyAppState, ...modifiedState}
    
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}


describe("Testing of App component", ()=>{

    beforeEach(()=>{
        jest.spyOn(axios,"get").mockResolvedValue({ data : dummyTodos });
    })

    jest.useFakeTimers();

    it("Should dispalay the todos in TodoList", async()=> {
        jest.spyOn(axios,"get").mockResolvedValue({data : dummyTodos });

        const {baseElement} = render(WithContext(App,{loading : false}));     
        jest.runAllTimers();
        
        expect(await screen.findAllByTestId("todo-item-card")).toHaveLength(2);
        expect(baseElement).toMatchSnapshot();

    });


    it("Should match snapshot", ()=> {
        const { baseElement } = render(WithContext(App));     
        expect(baseElement).toMatchSnapshot();
        
    });

})