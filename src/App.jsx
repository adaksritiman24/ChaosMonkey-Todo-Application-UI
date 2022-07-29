import { Grid, Stack, useTheme } from '@mui/material';
import React, { useReducer } from 'react'
import Body from './components/Body';
import Header from './components/Header';
import { state } from './constants/constants';
import TodoContext from './contexts/TodoContext';
import todoReducer from './reducers/todoReducer';

const App = ()=> {

    const [appState, dispatch] = useReducer(todoReducer,state)
    const todoContextValue = {appState, dispatch};

    const theme = useTheme();
    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");

    
    return (
        <TodoContext.Provider value={todoContextValue}>
            <Grid
                sx = {{
                        [desktopView] : { margin : "5rem 15rem"},
                        [tabletView] : { margin : "2rem 3.5rem"},
                        [mobileView] : { margin : "1rem 1rem"},
                }}
            >
                <Stack spacing={2}>
                    <Header/>
                    <Body/>
                </Stack>
            </Grid>
        </TodoContext.Provider>
    )
}

export default App;