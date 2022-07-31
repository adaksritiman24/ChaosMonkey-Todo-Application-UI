import { fireEvent, render, screen } from "@testing-library/react";
import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
import CreateModal from "../CreateModal";

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


describe("Create modal",  ()=> {
    it("It should render text create todo in modal", ()=> {
        render(WithContext(CreateModal, {isCreateTodoModalOpen : true}));
        
        expect(screen.getByRole("heading", {level : 2})).toHaveTextContent("Create Todo");
    })

    it("Should be able to write the title and body", ()=> {
        render(WithContext(CreateModal, {isCreateTodoModalOpen : true}));

        const title = screen.getByTestId("title").querySelector("input");
        const body = screen.getByTestId("body").querySelector("textarea");

        fireEvent.change(title, {target : {value : "title"}});
        fireEvent.change(body, {target : {value : "body"}});

        expect(title.value).toBe("title");
        expect(body.value).toBe("body");
    })

    it("should match snapshot",()=>{
        const {asFragment} = render(WithContext(CreateModal, {isCreateTodoModalOpen : true}));

        expect(asFragment).toMatchSnapshot();
    })
})