import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Données pour les graphiques
const creditUsageData = [
  { name: 'Jan', used: 10 },
  { name: 'Feb', used: 15 },
  { name: 'Mar', used: 30 },
  { name: 'Apr', used: 25 },
  { name: 'May', used: 20 },
];

const filterUsageData = [
  { name: 'Noir et Blanc', value: 400 },
  { name: 'Sépia', value: 300 },
  { name: 'Couleurs Vives', value: 300 },
  { name: 'Haute Résolution', value: 200 },
];

const COLORS = ['#FFBB28', '#FF8042', '#00C49F', '#0088FE'];

const Stats = () => {
  const totalCredits = 100;
  const usedCredits = 50;
  const remainingCredits = totalCredits - usedCredits;
  const subscriptionType = "Pro";
  const renewalDate = "30 Sept 2024";

  return (
    <Box sx={{ p: 3, bgcolor: '#1c1c2b', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Your Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Crédits Utilisés */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#2c2c3b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Crédits Utilisés Ce Mois-ci</Typography>
              <Typography variant="h4" sx={{ color: '#FFBB28' }}>
                {usedCredits} / {totalCredits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Abonnement */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#2c2c3b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Type d'Abonnement</Typography>
              <Typography variant="h4" sx={{ color: '#FF8042' }}>{subscriptionType}</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Renouvellement : {renewalDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistiques de l'Utilisation des Crédits */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#2c2c3b' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Utilisation des Crédits (Mensuel)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={creditUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                  <XAxis dataKey="name" stroke="#CCCCCC" />
                  <YAxis stroke="#CCCCCC" />
                  <Tooltip contentStyle={{ backgroundColor: '#33334d', borderColor: '#33334d' }} />
                  <Line type="monotone" dataKey="used" stroke="#FFBB28" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Préférences des Filtres */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#2c2c3b' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Préférences des Filtres
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={filterUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {filterUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#33334d', borderColor: '#33334d' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Crédits Restants */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#2c2c3b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Crédits Restants</Typography>
              <Typography variant="h4" sx={{ color: '#00C49F' }}>{remainingCredits}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
