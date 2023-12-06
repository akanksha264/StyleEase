import React from "react";
import {
    AccountBox,
  CurrencyRupee,
  Devices,
  MoreVert,
  TrendingUp,
} from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";

const salesData = [
  {
    stats: "123",
    title: "Sales",
    color: "#6ab04c",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "213",
    title: "Customers",
    color: "#FAC42F",
    icon: <AccountBox sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "56",
    title: "Products",
    color: "#FF3031",
    icon: <Devices sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "45",
    title: "Revenue",
    color: "#2475B0",
    icon: <CurrencyRupee sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            background: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{position:"relative", bgcolor:"#242B2E", color:"white"}}>
      <CardHeader title="Monthly Overview"
      action={
        <IconButton size="small">
            <MoreVert/>
        </IconButton>
      }
      
      subheader={
        <Typography variant="body2">
            <Box component="span" sx={{fontWeight:600}}>
                Total ____ growth
            </Box> this month 😎
        </Typography>
      }
      
      titleTypographyProps={{
        sx:{
            mb:2.5,
            lineHeight:"2rem !important",
            letterSpacing:".15px !important"
        }
      }}

      />

      <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}}>
        <Grid container spacing={[5,0]}>
            {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
