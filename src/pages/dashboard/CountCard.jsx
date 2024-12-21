import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CountCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://dashboard-a2016-default-rtdb.firebaseio.com/users.json' // Your Firebase API URL
        );

        const fetchedUsers = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Statistics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          {/* Count Card for Total Users */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Total Users
                </Typography>
                <Typography variant="h4" color="text.secondary">
                  {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* You can add more count cards here */}
        </Grid>
      )}
    </div>
  );
};

export default CountCard;
