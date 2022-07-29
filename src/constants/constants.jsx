export const SCOPE = {
    ALL : "all",
    COMPLETED : "completed",
    INCOMPLETE : "incomplete",
}

export const state = {
    scope : SCOPE.ALL,
    isCreateTodoModalOpen : false,
}

export const baseURI = "http://localhost:8080/todoservice/v1";