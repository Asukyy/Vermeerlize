import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Données par défaut pour les graphiques
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Stats = () => {
  // Valeurs par défaut
  const totalCredits = 100;
  const usedCredits = 50;
  const remainingCredits = totalCredits - usedCredits;
  const subscriptionType = "Pro";
  const renewalDate = "30 Sept 2024";

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Statistiques
      </Typography>

      <Grid container spacing={3}>
        {/* Crédits Restants */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Crédits Utilisés Ce Mois-ci</Typography>
              <Typography variant="h4">{usedCredits} / {totalCredits}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Abonnement */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Type d'Abonnement</Typography>
              <Typography variant="h4">{subscriptionType}</Typography>
              <Typography variant="body2">Renouvellement : {renewalDate}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistiques de l'Utilisation des Crédits */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Utilisation des Crédits (Mensuel)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={creditUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="used" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Préférences des Filtres */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Préférences des Filtres</Typography>
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
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Crédits Restants */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Crédits Restants</Typography>
              <Typography variant="h4">{remainingCredits}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
