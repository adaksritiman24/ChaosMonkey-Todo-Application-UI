import { Grid, Skeleton, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'

const LoadingItem = ()=>
    (
        <Grid item md={4} sm={6} xs={12}>
            <Box border={1} borderColor={grey[100]}
                sx={{
                    height : "250px"
                }}
            >   
            <Stack spacing={2} m={1} mt={2}>
                <Skeleton variant='rectangular' height="40px" width="80%"  sx={{ borderRadius : "4px",}}/>
                <Skeleton variant='rectangular' height="95px"  sx={{ borderRadius : "4px",}}/>
                <Stack direction="row" spacing={1} sx={{paddingTop:"10px"}}>
                    <Skeleton variant='rectangular' width="90px"  height="35px" sx={{ borderRadius : "20px",}}/>
                    <Skeleton variant='rectangular' width="90px"  height="35px" sx={{ borderRadius : "20px",}}/>
                </Stack>
            </Stack>
            </Box>
        </Grid>
    )

const LoadingComponent=()=> {

  return (
      <>
    <LoadingItem/>
    <LoadingItem/>
    <LoadingItem/>
    <LoadingItem/>
    <LoadingItem/>
    <LoadingItem/>
    </>
  )
}

export default LoadingComponent