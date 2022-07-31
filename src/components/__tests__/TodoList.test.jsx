import {render, screen } from "@testing-library/react";
import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
import TodoList from "../TodoList";

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
    {
        id : 3,
        title : "Dummy Title 3",
        body : "Dummy Body 3",
        completed : 0
    },
    {
        id : 4,
        title : "Dummy Title 4",
        body : "Dummy Body 4",
        completed : 1
    },
    {
        id : 5,
        title : "Dummy Title 5",
        body : "Dummy Body 5",
        completed : 0
    },
]

const dummyAppState = {
    todos : dummyTodos,
    scope : SCOPE.ALL,
};
const dispatch = jest.fn();

const WithContext = (Application, modifiedState={})=> {
    const appState = {...dummyAppState, ...modifiedState}
    
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}

describe("TodoList", ()=>{

    it("Should show loading screen when loading is true", ()=>{
        render(WithContext(TodoList, {loading : true}));

        expect(screen.getAllByTestId("loading-box")).toHaveLength(9);
    });
    
    it("Should show all todos when scope is all", ()=>{
        render(WithContext(TodoList));

        expect(screen.getAllByTestId("todo-item-card")).toHaveLength(5);
    });

    it("Should show only completed todos when scope is completed", ()=>{
        render(WithContext(TodoList, {scope : SCOPE.COMPLETED}));

        expect(screen.getAllByTestId("todo-item-card")).toHaveLength(2);
    });

    it("Should show incomplete todos when scope is incomplete", ()=>{
        render(WithContext(TodoList, {scope : SCOPE.INCOMPLETE}));

        expect(screen.getAllByTestId("todo-item-card")).toHaveLength(3);
    });

})