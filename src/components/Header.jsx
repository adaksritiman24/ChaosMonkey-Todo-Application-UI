import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'
import Todoutils from './Todoutils';

const Header=()=> {
    const theme = useTheme();

    const desktopView = theme.breakpoints.up("lg");
    const tabletView = theme.breakpoints.up("md");
    const mobileView = theme.breakpoints.up("xs");

  return (
    <Box
        sx={{
            background: grey[200],
            borderRadius : "4px",
            display : "flex",
            justifyContent : "space-between",
        }}
        p = {2}
    >
        <Typography
            sx={{
                [desktopView] : {
                    fontSize : "46px",
                },
                [tabletView] : {
                    fontSize : "36px",
                },
                [mobileView] : {
                    fontSize : "26px",
                },
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