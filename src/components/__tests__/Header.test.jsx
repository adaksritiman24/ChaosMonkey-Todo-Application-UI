import { render, screen } from "@testing-library/react"
import Header from "../Header"
import TodoContext from "../../contexts/TodoContext";

const appState = {};
const dispatch = jest.fn();

const WithContext = (Application)=> {
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}


describe("Header component", ()=> {

    it("Should have the heading Todo Application", ()=> {
        render(WithContext(Header));

        expect(screen.getByRole("heading")).toHaveTextContent("Todo Application");
    });

    it("Should have a create todo Button", ()=> {
        render(WithContext(Header));

        expect(screen.queryByTestId("todo-create-button")).toBeInTheDocument();
    })
})