import { Box, Grid} from '@mui/material'
import React from 'react'
import Todo from './Todo';


function TodoList() {
  return (
   <Box
   py={1}
   >
    <Grid  container spacing={1}>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
    </Grid>

   </Box>
  )
}

export default TodoList;