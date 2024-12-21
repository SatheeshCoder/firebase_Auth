import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { H3 } from "../../components/Typography";
import { FlexBetween } from "../../components/FlexBox";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  const [isLineChart, setIsLineChart] = useState(true); // State to toggle between Line and Bar chart
  const [data, setData] = useState([]);

  // Sample data for present and absent users
  const monthlyAttendanceData = [
    { month: "January", present: 50, absent: 10 },
    { month: "February", present: 45, absent: 15 },
    { month: "March", present: 60, absent: 5 },
    { month: "April", present: 55, absent: 10 },
    { month: "May", present: 70, absent: 8 },
    { month: "June", present: 65, absent: 12 },
    { month: "July", present: 80, absent: 10 },
    { month: "August", present: 75, absent: 13 },
    { month: "September", present: 85, absent: 5 },
    { month: "October", present: 90, absent: 2 },
    { month: "November", present: 95, absent: 3 },
    { month: "December", present: 100, absent: 0 },
  ];

  // Chart data for the chart component
  const chartData = {
    labels: monthlyAttendanceData.map((item) => item.month),
    datasets: [
      {
        label: "Present Users",
        data: monthlyAttendanceData.map((item) => item.present),
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
      {
        label: "Absent Users",
        data: monthlyAttendanceData.map((item) => item.absent),
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        fill: false,
      },
    ],
  };

  // Button handler to toggle between Line and Bar chart
  const toggleChartType = () => {
    setIsLineChart(!isLineChart);
  };

  return (
    <>
      <H3 sx={{
                textAlign: 'center'
              }}>Attendance Data - Present vs Absent</H3>
     

      {/* Display either Line Chart or Bar Chart */}
      <Card>
        <CardContent>
          <Grid container justifyContent="center">
            {isLineChart ? (
              <Line data={chartData} options={{ responsive: true }} />
            ) : (
              <Bar data={chartData} options={{ responsive: true }} />
            )}
          </Grid>
        </CardContent>
      </Card>
      <FlexBetween>
      <Button variant="contained" onClick={toggleChartType} sx={{ marginBottom: "20px", marginTop: "20px" }} color="primary">
        Switch to {isLineChart ? "Bar Chart" : "Line Chart"}
      </Button><Button variant="outlined" onClick={toggleChartType} sx={{ marginBottom: "20px", marginTop: "20px" }} color="primary">
        Download Report      </Button>
      </FlexBetween>

    </>
  );
};

export default AttendanceChart;
