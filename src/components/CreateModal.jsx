import { Box, Button, FormControl, Modal, Paper, Stack, styled, TextareaAutosize, TextField, Typography, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import React, { useContext } from 'react'
import { ACTIONS } from '../constants/actions'
import { baseURI } from '../constants/constants'
import TodoContext from '../contexts/TodoContext'

const StyledTextField = styled(TextField)({
    fontFamily : "arial",
    
    "& .MuiInputBase-input" : {
        fontSize : "24px",
    }
})

const CreateModal=()=> {

    const {appState, dispatch} = useContext(TodoContext);
    const theme = useTheme();
    const tabletView = theme.breakpoints.up("md");

    const handleModalClose = ()=> {
        dispatch({
            type : ACTIONS.SET_IS_CREATE_TODO_MODAL_OPEN,
            payload : false,
        })
    }

    const addDataToTodos = (todo)=> {
        if(todo === undefined) return;
        dispatch({
            type : ACTIONS.SET_TODOS,
            payload: [...appState.todos, todo]
        })
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const {title, description} = e.target; 
        const cleanedTitle = title.value.trim();
        const cleanedBody = description.value.trim();

        const newTodoData = JSON.stringify({
            "title": cleanedTitle,
            "body": cleanedBody,
            "completed": 0
        });

        const config = {
            method: 'post',
            url: baseURI+'/todo',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : newTodoData,
        };
        const {data} = await axios(config);
        addDataToTodos(data);

        handleModalClose();
    }

  return (
    <Modal
        open={appState.isCreateTodoModalOpen}
        onClose={handleModalClose}
        aria-labelledby="create-modal-modal-title"
        aria-describedby="create-modal-modal-description"
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
            <Typography id="create-modal-modal-title" variant="h5" component="h2">
               Create Todo
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl fullWidth>
                        <StyledTextField
                        required
                        label="Todo Title"
                        variant="filled"
                        name='title'
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
                        />
                    </FormControl>

                    <Button type='submit' variant='contained' color='secondary' size='large'>
                        Submit
                    </Button>
                </Stack>
            </form>
            
        </Box>
    </Modal>
  )
}

export default CreateModal