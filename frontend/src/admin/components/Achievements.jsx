import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

const TriangleImg=styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})

const TrophyImg=styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:"absolute"
})

const Achievements = () => {
  return (
    <Card sx={{position:"relative", bgcolor:"#242B2E", color:"white"}}>
        <CardContent>
            <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                StyleEase
            </Typography>

            <Typography variant='body2'>
                Congratulations 🥳
            </Typography>

            <Typography variant='h5' sx={{my:3.1}}>
                Number of sales
            </Typography>

            <Button size="small" variant='contained'>View Sales</Button>

            <TriangleImg src=''/>
            <TrophyImg src='https://cdn.pixabay.com/photo/2013/07/13/12/41/cup-160117_1280.png'/>
        </CardContent>
    </Card>
  )
}

export default Achievements