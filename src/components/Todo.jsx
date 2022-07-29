import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "200px",
  backgroundColor: grey[200],
}));

function Todo() {
  return (
    <Grid item md={4} sm={6} xs={12}>
      <StyledPaper elevation={2}>
        <Card
          sx={{
            height: "100%",
          }}
        >
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Sample Todo
            Sample Todo
            Sample Todo
            Sample Todo
            Sample Todo
            Sample Todo
            Sample Todo
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, at.
            </Typography>
        </CardContent>
        </Card>
      </StyledPaper>
    </Grid>
  );
}

export default Todo;
