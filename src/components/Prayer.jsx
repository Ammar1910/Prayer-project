import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Prayer({ name, time }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/prayer.png"
      />
      <CardContent>
        <h4 gutterBottom variant="h5" component="div">
          {name}

        </h4>
        <Typography variant="h2" sx={{ color: 'text.secondary' }}>
          {time}
        </Typography>
      </CardContent>

    </Card>
  );
}


