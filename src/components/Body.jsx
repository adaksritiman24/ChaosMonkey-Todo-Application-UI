import { Box, ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

import React, { useContext } from 'react'
import { ACTIONS } from '../constants/actions'
import { SCOPE } from '../constants/constants'
import TodoContext from '../contexts/TodoContext'
import TodoList from './TodoList'

const Body=()=> {

    const theme = useTheme();
    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");

    const {appState, dispatch} = useContext(TodoContext);
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
        p={1}
    >
        <Box>
            <ToggleButtonGroup value={appState.scope} exclusive onChange={handleScopeChange} color="secondary"
                sx = {{
                    background: grey[100],
                    "& button" : {
                        textTransform : "none",

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
            <hr/>
            <TodoList/>
        </Box>
    </Box>
  )
}

export default Body