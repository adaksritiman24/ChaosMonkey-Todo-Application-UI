import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const Todoutils =()=> {
  return (
    <Box
        sx = {{
            display : "flex",
            alignItems : "center",
        }}
    >
        <Button
            data-testid = "todo-create-button"
            variant='contained' color='secondary' size='large'
            sx={{
                textTransform : "none",
            }}
        >
            <AddIcon/>
            <Typography
                sx = {{
                    fontSize : "20px"
                }}
            >
                Create Todo
            </Typography>
        </Button>
    </Box>
  )
}

export default Todoutils