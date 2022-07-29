import { Box, Grid} from '@mui/material'
import React, { useContext } from 'react'
import TodoContext from '../contexts/TodoContext';
import Todo from './Todo';


const renderAllTodos=(todos)=> {
  return todos.map((todo)=> <Todo todoDetails={todo} key={todo.id}/>)
}

function TodoList() {

  const {appState} = useContext(TodoContext);

  return (
   <Box
   py={1}
   >
    <Grid  container spacing={1}>
       {renderAllTodos(appState.todos? appState.todos :[])}
    </Grid>

   </Box>
  )
}

export default TodoList;