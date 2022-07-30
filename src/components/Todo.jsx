import { Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React,{useContext} from "react";
import { ACTIONS } from "../constants/actions";
import TodoContext from "../contexts/TodoContext";
import updateTodo from "../utils/updateTodo";

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "250px",
  backgroundColor: grey[200],
}));

const buttonStyles = {
  borderRadius : "20px",
  boxShadow : "none",
  textTransform : "none",
}

function Todo({todoDetails}) {

  const {appState, dispatch} = useContext(TodoContext);

  const setTodoStatus = async(completed)=> {
    const updatedTodo = {...todoDetails, completed};
    const updatedTodoResponse = await updateTodo(updatedTodo);

    const updatedTodos = appState.todos.map((todo)=>{
      if(todo.id === updatedTodoResponse.id)
        return {...todo, completed: updatedTodoResponse.completed};
      return todo;
    });

    dispatch({
      type : ACTIONS.SET_TODOS,
      payload : updatedTodos
    })
  }


  return (
    <Grid item lg={4} sm={6} xs={12}>
      <StyledPaper elevation={2}>
        <Card
          sx={{
            height: "100%",
            
          }}
        >
          <CardContent 
          sx={{
            height : "150px",
            maxHeight : "150px",
            overflow : "hidden",
            backgroundColor : todoDetails.completed===1? green[50] : grey[0],
          }}
            
          >
            <Typography gutterBottom variant="h5" component="div"
              sx={{
                textOverflow : "ellipsis",
                WebkitLineClamp: 2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",

              }}
            >
            {todoDetails.title}
            </Typography>
            <Typography
               variant="body2" 
               color="text.secondary"
               sx={{
                WebkitLineClamp: 4,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
               }}
            >
            {todoDetails.body}
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              height : "50px",
              display : "flex",
              justifyContent : "space-between",
            }}
          >
            <Stack spacing={1} direction="row">
              <Button 
              color="success" 
              variant={todoDetails.completed===1? "contained" : "outlined"} 
              sx={buttonStyles} 
              onClick={()=>setTodoStatus(1)}>
                Completed
              </Button>
              <Button 
              color="error" 
              variant={todoDetails.completed===0? 
              "contained" : "outlined"} 
              sx={buttonStyles}  
              onClick={()=>setTodoStatus(0)}>
                Incomplete
              </Button>
            </Stack>
            <Box>
              <IconButton>
                <Edit/>
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </StyledPaper>
    </Grid>
  );
}

export default Todo;
