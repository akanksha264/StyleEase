import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {

    const navigate=useNavigate();

  return (
    <div onClick={() => navigate(`/account/orders/${5}`)} className='border p-5 hover:shadow-xl'>
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            <Grid item xs={6}>
                <div className='flex cursor-pointer'>
                    <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70" alt="" />

                    <div className='ml-5 space-y-2'>
                        <p>Men Printed Pure Cotton Straight Kurta</p>
                        <p className='font-semibold opacity-50 text-xs'>Size:M</p>
                        <p className='font-semibold opacity-50 text-xs'>Color:Black</p>
                    </div>
                </div>
            </Grid>

            <Grid item xs={2}>
                <p>Rs. 299</p>
            </Grid>

            <Grid item xs={4}>
                {true && <p>
                    <CheckCircleIcon sx={{width:"15px", height:"15px"}} className='mr-2 text-sm text-green-600'/>
                    <span>Delivered on November 06</span>
                </p>}

                {false && <p>
                    <AdjustIcon sx={{width:"15px", height:"15px"}} className='mr-2 text-sm text-green-600'/>
                    <span>Expected Delivery by November 06</span>
                </p>}
            </Grid>
        </Grid>
    </div>
  )
}

export default OrderCard