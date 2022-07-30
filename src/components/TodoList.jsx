import { Box, Grid} from '@mui/material'
import React, { useContext } from 'react'
import TodoContext from '../contexts/TodoContext';
import LoadingComponent from './LoadingComponent';
import Todo from './Todo';

const scopedFilter = {
  all: ()=> true,
  completed : (todo)=> todo.completed === 1,
  incomplete : (todo)=> todo.completed !== 1,
}

const renderAllTodos=(todos, scope)=> {

  const filteredTodos = todos.filter(scopedFilter[scope])
  return filteredTodos.map((todo)=> <Todo todoDetails={todo} key={todo.id}/>)
}

function TodoList() {

  const {appState} = useContext(TodoContext);
  const scope = appState.scope;

  console.log("Rendering TodoList...");

  return (
   <Box
   py={1}
   >
    <Grid  container spacing={1}>
       {appState.loading? <LoadingComponent/> : renderAllTodos(appState.todos? appState.todos :[], scope)}
    </Grid>

   </Box>
  )
}

export default TodoList;