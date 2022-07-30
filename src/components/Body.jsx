import { Box, ToggleButtonGroup, ToggleButton, useTheme, ThemeProvider, createTheme } from '@mui/material'
import { grey, blue, purple } from '@mui/material/colors'

import React, { useContext } from 'react'
import { ACTIONS } from '../constants/actions'
import { SCOPE } from '../constants/constants'
import TodoContext from '../contexts/TodoContext'
import TodoList from './TodoList'
import UpdateTodoModal from './UpdateTodoModal'

const Body=()=> {

    const theme = useTheme();
    const {appState, dispatch} = useContext(TodoContext);
    const toggleTheme = createTheme({
        palette: {
          primary: {
            light: blue[50],
            main: blue[800],
            dark: blue[900]
          },
          secondary: {
            light: grey[50],
            main: grey[800],
            dark: grey[900]
          },
        },
    });

    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");

    const handleScopeChange = (event, newScope)=> {
        if(newScope != null) dispatch(
            {
                type : ACTIONS.CHANGE_SCOPE,
                payload : newScope,
            }
        )
    }

  return (
    <Box
        sx={{
            [desktopView] : {
                padding : 4,
                pt : 1,
            },
            [mobileView] : {
                padding : 1,
                pt : 1,
            },
        }}
    >
        <Box>
            <ThemeProvider theme={toggleTheme}>
                <ToggleButtonGroup value={appState.scope} exclusive onChange={handleScopeChange} color="primary"
                    sx = {{

                        background: grey[100],
                        "& button" : {
                            textTransform : "none",
                            border : `1px solid ${blue[600]}`,
                            [desktopView] : {
                                fontSize : "20px",
                                py : "5px",

                            },
                            [tabletView] : {
                                fontSize : "15px",
                                py : "2px",

                            },
                            [mobileView] : {
                                fontSize : "12px",
                                py : "0px",

                            }
                        },
                    }}
                >
                    <ToggleButton value={SCOPE.ALL}>All</ToggleButton>
                    <ToggleButton value={SCOPE.COMPLETED}>Completed</ToggleButton>
                    <ToggleButton value={SCOPE.INCOMPLETE}>Incomplete</ToggleButton>
                </ToggleButtonGroup>
            </ThemeProvider>
            <hr/>
            <UpdateTodoModal/>
            <TodoList/>
        </Box>
    </Box>
  )
}

export default Body