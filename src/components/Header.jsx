import { Box, Typography, useTheme } from '@mui/material';
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
            backgroundColor: '#3d5afe',
            color: 'white',
            display : "flex",
            justifyContent : "space-between",
            position : "sticky",
            top: "0px",
            zIndex : '1000',
            boxShadow: "0px 1px 3px 0px gray",
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
                fontFamily : "Helvetica Neue",
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