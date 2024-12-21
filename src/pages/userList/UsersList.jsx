import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Avatar, styled } from '@mui/material';
import { H2 } from '../../components/Typography';
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
        margin: "16px",
    },
    
}));
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://dashboard-a2016-default-rtdb.firebaseio.com/users.json' // Ensure the URL has '.json'
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
    <Container>
      <H2>User List</H2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={user.name}
                  height="140"
                  image={user.imgUrl}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Balance:</strong> {user.balance}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {user.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UsersList;
