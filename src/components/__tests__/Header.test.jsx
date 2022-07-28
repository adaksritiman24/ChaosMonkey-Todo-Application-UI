import { render, screen } from "@testing-library/react"
import Header from "../Header"


describe("Header component", ()=> {

    it("Should have the heading Todo Application", ()=> {
        render(<Header/>);

        expect(screen.getByRole("heading")).toHaveTextContent("Todo Application");
    });

    it("Should have a create todo Button", ()=> {
        render(<Header/>);

        expect(screen.queryByTestId("todo-create-button")).toBeInTheDocument();
    })
})