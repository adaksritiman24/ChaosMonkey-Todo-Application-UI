import { Grid, Stack } from '@mui/material';
import React from 'react'
import Body from './components/Body';
import Header from './components/Header';

const App = ()=> {
    return (
        <Grid
            sx = {{
                margin : "5rem 15rem"
            }}
        >
            <Stack spacing={2}>
                <Header/>
                <Body/>
            </Stack>
        </Grid>
    )
}

export default App;