import { Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard'
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const orderStatus=[
    {label:"Shipped", value:"shipped"},
    {label:"Out for Delivery", value:"out_for_delivery"},
    {label:"Delivered", value:"delivered"},
    {label:"Cancelled", value:"cancelled"},
    {label:"Returned", value:"returned"},
]

const Orders = () => {
  return (
    <div className='px-5 lg:px-20'>
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={12} lg={2.5}>
                <div className='h-auto border bg-white sticky top-5 p-5 mb-10'>
                    <div className='flex justify-between items-center text-gray-500'>
                        <h1 className='font-bold text-lg'>Filters</h1>
                        <FilterAltOutlinedIcon />
                    </div>                    

                    <div className='space-y-4 mt-10'>
                        <h1 className='font-semibold'>ORDER STATUS</h1>

                        {orderStatus.map((item) => <div className='flex items-center'>
                            <input type="checkbox" defaultValue={item.value} className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' />
                            <label htmlFor={item.value} className='ml-3 text-sm text-gray-600'>{item.label}</label>
                        </div>)}
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} lg={9}>
                <div className="space-y-5">
                    {[1,1,1,1,1,1].map((item) => <OrderCard/>)}
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Orders