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
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";

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


  return (
    <Grid item md={4} sm={6} xs={12}>
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
              <Button color="success" variant="contained" sx={buttonStyles}>Completed</Button>
              <Button color="error" variant="outlined" sx={buttonStyles}>Incomplete</Button>
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
