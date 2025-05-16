import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const EntryCard = ({ entry }) => {
  return (
    <Card sx={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      maxWidth: 320,
      margin: '20px auto',
      overflow: 'hidden'
    }}>
      <CardMedia
        component="img"
        height="180"
        image={entry.image}
        alt={entry.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: '#FF8DA1' }}>{entry.title}</Typography>
        <Typography variant="body2" color="text.secondary">📺 {entry.type} | 🎬 {entry.genre}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>⭐ {entry.rating}/10</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>💬 "{entry.review}"</Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            size="small"
            href={entry.downloadLink}
            sx={{
              borderRadius: '12px',
              color: '#FF8DA1',
              borderColor: '#FF8DA1',
              '&:hover': {
                backgroundColor: '#FFEDF0'
              }
            }}
          >
            📥 Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
