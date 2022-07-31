import { Delete } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Modal, Stack, styled, TextField, Tooltip, Typography, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useContext } from 'react'
import { ACTIONS } from '../constants/actions'
import TodoContext from '../contexts/TodoContext'
import updateTodo from '../utils/updateTodo'
import deleteTodo from '../utils/deleteTodo'

const StyledTextField = styled(TextField)({
    fontFamily : "helvetica",
    
    "& .MuiInputBase-input" : {
        fontSize : "24px",
    }
})

const UpdateTodoModal=()=> {

    const {appState, dispatch} = useContext(TodoContext);

    const todo = appState.updatingTodo;
    if(!todo) return <></>;

    const theme = useTheme();
    const tabletView = theme.breakpoints.up("md");

    const handleModalClose = ()=> {
        dispatch({
            type : ACTIONS.SET_IS_UPDATE_TODO_MODAL_OPEN,
            payload : false,
        })
        dispatch({
            type : ACTIONS.SET_UPDATING_TODO,
            payload : undefined,
        })
    }


    const handleSubmit = async (e)=> {
        e.preventDefault();
        const {title, description} = e.target; 
        const cleanedTitle = title.value.trim();
        const cleanedBody = description.value.trim();

        const changedTodo = {...todo, title: cleanedTitle, body: cleanedBody};
        const updatedTodo = await updateTodo(changedTodo);

        const updatedAllTodos = appState.todos.map((todo)=>{
            if(todo.id === updatedTodo.id)
                return updatedTodo;
            return todo;    
        })

        dispatch({
            type : ACTIONS.SET_TODOS,
            payload : updatedAllTodos
        })

        handleModalClose();
    }

    const handleDeleteTodo = async()=> {
        const todoId = await deleteTodo(todo.id);

        const updatedAllTodos = appState.todos.filter((todo)=>todo.id !== todoId)
        dispatch({
            type : ACTIONS.SET_TODOS,
            payload : updatedAllTodos
        })
        handleModalClose();
    }

  return (
    <Modal
        open={appState.isUpdateTodoModalOpen}
        onClose={handleModalClose}
        aria-labelledby="update-modal-modal-title"
        aria-describedby="update-modal-modal-description"
        data-testid = "update-todo-modal"
    >
        <Box sx={{
            position : 'absolute',
            background: grey[100],
            transform : "translate(-50%, -50%)",
            left: "50%",
            top: "35%",
            width : "270px",
            [tabletView] : {
                width : "400px",
            },
            p : 3,
            borderRadius:1,
        }}>
            <Typography id="update-modal-modal-title" variant="h4" component="h2">
               Update Todo
            </Typography>
            <hr/>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl fullWidth>
                        <StyledTextField
                        required
                        label="Todo Title"
                        variant="filled"
                        name='title'
                        defaultValue={todo.title}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField 
                        multiline
                        variant='filled'
                        label = "Todo description"
                        rows={5}
                        name = "description"
                        style={{
                            fontSize: "20px",
                            fontFamily : "arial",
                        }}
                        defaultValue={todo.body}
                        />
                    </FormControl>
                    <Stack spacing={2} direction="row-reverse">
                        <Button type='submit' variant='contained' color='secondary' size='medium'>
                            Save
                        </Button>
                        <Button variant='contained' color='error' size='medium' onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Tooltip title="Delete Todo" placement='left'>
                            <IconButton onClick={handleDeleteTodo}>
                                <Delete color="error"/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </form>
            
        </Box>
    </Modal>
  )
}

export default UpdateTodoModal;