import { render, screen } from "@testing-library/react"
import LoadingComponent from "../LoadingComponent"


describe("Loading Component", ()=> {

    it("Should show nine Loading items", ()=>{
        render(<LoadingComponent/>);

        expect(screen.getAllByTestId("loading-box")).toHaveLength(9);
    })

    it("should match snapshots",()=>{
        const {baseElement} = render(<LoadingComponent/>);

        expect(baseElement).toMatchSnapshot();
    })
})