import { Grid, Stack, useTheme } from '@mui/material';
import React, { useReducer, useEffect } from 'react'
import Body from './components/Body';
import Header from './components/Header';
import { ACTIONS } from './constants/actions';
import { state , baseURI} from './constants/constants';
import TodoContext from './contexts/TodoContext';
import todoReducer from './reducers/todoReducer';
import axios from "axios";
import { grey } from '@mui/material/colors';

const App = ()=> {

    const [appState, dispatch] = useReducer(todoReducer,state)
    const todoContextValue = {appState, dispatch};
    
    const theme = useTheme();
    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");
    
    useEffect(() => {
        setTimeout(() => {
            const fetchTodoData = async()=>{
                const response = await axios.get(baseURI+"/todo");
                dispatch({
                    type : ACTIONS.SET_TODOS,
                    payload : response.data ? response.data : [],
                })
                dispatch({
                    type : ACTIONS.SET_LOADING,
                    payload : false,
                })
            }
            fetchTodoData();  
        }, 3000);
    
    },[]);
    
    return (
        <TodoContext.Provider value={todoContextValue}>
            <Grid
                sx = {{
                    margin : 0,
                    padding : 0,
                        [desktopView] : { margin : "0rem 8rem"},
                        [tabletView] : { margin : "0rem 3.5rem"},
                        [mobileView] : { margin : "0rem 0rem"},
                    backgroundColor : grey[50],    
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