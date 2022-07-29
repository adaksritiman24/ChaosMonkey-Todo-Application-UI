import {render, screen} from "@testing-library/react";
import App from "../App";
import TodoContext from "../contexts/TodoContext";

const appState = {};
const dispatch = jest.fn();

const WithContext = (Application)=> {
    const todoContextValue = {appState, dispatch};
    return <TodoContext.Provider value={todoContextValue}>
            <Application/>
        </TodoContext.Provider>
}

describe("Testing of App component", ()=>{

    it("Should match snapshot", ()=> {
        const { baseElement } = render(WithContext(App));     
        expect(baseElement).toMatchSnapshot();
        
    });
})