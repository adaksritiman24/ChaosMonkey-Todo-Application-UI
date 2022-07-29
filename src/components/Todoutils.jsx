import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateModal from './CreateModal';
import { ACTIONS } from '../constants/actions'
import TodoContext from '../contexts/TodoContext'


const Todoutils =()=> {
    const theme = useTheme();
    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");

    const {dispatch} = useContext(TodoContext);

    const handleCreateTodoModalOpen = ()=> {
        dispatch({
            type : ACTIONS.SET_IS_CREATE_TODO_MODAL_OPEN,
            payload : true
        })
    }

  return (
    <Box
        sx = {{
            display : "flex",
            alignItems : "center",
        }}
    >
        <Button
            onClick={handleCreateTodoModalOpen}
            data-testid = "todo-create-button"
            variant='contained' color='secondary'
            sx={{
                textTransform : "none",
            }}
            
        >
            <ListAltIcon
                sx={{
                    marginRight : 1
                }}
            />
            <Typography
                sx = {{
                    [desktopView] : {
                        fontSize : "20px",
                    },
                    [tabletView] : {
                        fontSize : "16px",
                    },
                    [mobileView] : {
                        fontSize : "12px",
                    },
                }}
            >
                Create Todo
            </Typography>
        </Button>
        <CreateModal/>
    </Box>
  )
}

export default Todoutils