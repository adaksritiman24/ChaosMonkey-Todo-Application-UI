import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'
import Todoutils from './Todoutils';

const Header=()=> {
  return (
    <Box
        sx={{
            border : `1px solid ${grey[400]}`,
            background: grey[100],
            borderRadius : "4px",
            display : "flex",
            justifyContent : "space-between",
        }}
        p = {2}
    >
        <Typography
            sx={{
                fontSize: "46px",
                fontFamily : "arial",
                boxSizing : "fit-content",
                m : "0",
                p : "0",
                lineHeight : "none",
            }}
            component = 'h1'
        >
            Todo Application
        </Typography>
        <Todoutils/>
    </Box>
  )
}

export default Header;