import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React from 'react'

const Body=()=> {
  return (
    <Box
        sx={{
            border : "2px solid green"
        }}
    >
        <Box>
            <ToggleButtonGroup>
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="incomplete">Incomplete</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    </Box>
  )
}

export default Body