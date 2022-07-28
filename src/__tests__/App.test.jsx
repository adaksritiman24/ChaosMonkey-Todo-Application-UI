import {render, screen} from "@testing-library/react";
import App from "../App";

describe("Testing of App component", ()=>{

    it("Should match snapshot", ()=> {
        const { baseElement } = render(<App/>);     
        expect(baseElement).toMatchSnapshot();
        
    });
})