import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "../../config";
import { Card, CardContent, Typography, CircularProgress, styled, Grid } from '@mui/material';
import { H2, H5 } from "../../components/Typography";
import AttendanceChart from "./AttendanceChart";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
}));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Use getDatabase for Realtime Database

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, '/'); // Adjust path if necessary
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          const dataArray = Object.keys(fetchedData).map((key) => ({
            id: key,
            ...fetchedData[key],
          }));
          setData(dataArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  // Chart data for widget
  const chartData = {
    labels: data.map(item => item.month), // Assuming 'month' is a field in your data
    datasets: [
      {
        label: "Sales Over Time",
        data: data.map(item => item.sales), // Assuming 'sales' is a field in your data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container>
      <H2> Dashboard</H2>
      <Grid container spacing={1}>
        {/* First chart card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <H5>Sales Over Time</H5>
              {loading ? <CircularProgress /> : <Line data={chartData} />}
            </CardContent>
          </Card>
        </Grid>

        {/* Second chart card */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <H5 sx={{
                textAlign: 'center'
              }} >Attendance Chart</H5>
              {loading ? <CircularProgress /> : <AttendanceChart />}
            </CardContent>
          </Card>
        </Grid> <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <H5 sx={{
                textAlign: 'center'
              }} >Attendance Chart</H5>
              {loading ? <CircularProgress /> : <AttendanceChart />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LineChartComponent;
