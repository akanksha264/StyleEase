import { Grid } from '@mui/material'
import React from 'react'
import Achievements from './Achievements'
import MonthlyOverview from './MonthlyOverview'
import ProductTable from './ProductTable'
import OrderTable from './OrderTable'
import CustomerTable from './CustomerTable'

const AdminDashboard = () => {
  return (
    <div className='p-5'>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <Achievements/>
        </Grid>

        <Grid item xs={12} md={8}>
          <MonthlyOverview/>
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductTable/>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomerTable/>
        </Grid>

        <Grid item xs={12} md={12}>
          <OrderTable/>
        </Grid>

      </Grid>
    </div>
  )
}

export default AdminDashboard