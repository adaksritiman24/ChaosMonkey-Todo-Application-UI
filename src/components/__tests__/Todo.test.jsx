import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodoContext from "../../contexts/TodoContext";
import { SCOPE } from "../../constants/constants";
import Todo from "../Todo";
import { ACTIONS } from "../../constants/actions";
import { act } from "react-dom/test-utils";
import * as UpdateTodoUtils from "../../utils/updateTodo";

const dummyTodos = [
  {
    id: 1,
    title: "Dummy Title",
    body: "Dummy Body",
    completed: 0,
  },
  {
    id: 2,
    title: "Dummy Title 2",
    body: "Dummy Body 2",
    completed: 1,
  },
];

const dummyAppState = {
  todos: dummyTodos,
  scope: SCOPE.ALL,
  isUpdateTodoModalOpen: false,
};
const dispatch = jest.fn();

const TodoContextProvider = (props) => {
  const appState = { ...dummyAppState, ...props.modifiedState };

  const todoContextValue = { appState, dispatch };
  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

const renderTodoWithDummyTodoDetails = () => {
  const dummyTodoDetail = dummyTodos[0];
  const { baseElement } = render(
    <TodoContextProvider>
      <Todo todoDetails={dummyTodoDetail} />
    </TodoContextProvider>
  );

  return baseElement;
};

describe("Todo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render Todo item when todoDetail is passed as prop", () => {
    const baseElement = renderTodoWithDummyTodoDetails();

    expect(screen.getByText(/Dummy Title/)).toBeInTheDocument();
    expect(screen.getByText(/Dummy Body/)).toBeInTheDocument();

    expect(baseElement).toMatchSnapshot();
  });

  it("Should dispatch action when Edit icon is clicked", () => {
    renderTodoWithDummyTodoDetails();
    const editButton = screen.getAllByRole("button")[2];

    fireEvent.click(editButton);

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith({
      type: ACTIONS.SET_IS_UPDATE_TODO_MODAL_OPEN,
      payload: true,
    });
    expect(dispatch).toBeCalledWith({
      type: ACTIONS.SET_UPDATING_TODO,
      payload: dummyTodos[0],
    });
  });

  it("Should dispatch updated todolist when complete button is clicked", async () => {
    const updatedTodoDetails = {
      ...dummyTodos[0],
      completed: 1,
    };
    jest
      .spyOn(UpdateTodoUtils, "updateTodo")
      .mockImplementation(() => Promise.resolve(updatedTodoDetails));

    renderTodoWithDummyTodoDetails();

    const expectedListOfTodos = [
      {
        id: 1,
        title: "Dummy Title",
        body: "Dummy Body",
        completed: 1,
      },
      {
        id: 2,
        title: "Dummy Title 2",
        body: "Dummy Body 2",
        completed: 1,
      },
    ];

    const completeButton = screen.getAllByRole("button")[0];
    act(() => {
      fireEvent.click(completeButton);
    });

    await waitFor(() => {
      expect(dispatch).toBeCalledWith({
        type: ACTIONS.SET_TODOS,
        payload: expectedListOfTodos,
      });
    });
  });
});
