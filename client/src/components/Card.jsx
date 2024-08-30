import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const PostCard = ({ _id, name, prompt, photo, onDelete, onImageClick }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onDelete(_id); // Si la suppression réussit, mettez à jour l'affichage
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to delete the post');
      }
    } catch (err) {
      console.error('An error occurred while deleting the post:', err);
      alert('An error occurred while deleting the post');
    }
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={photo}
        alt={prompt}
        onClick={() => onImageClick({ _id, name, prompt, photo })}
        sx={{ cursor: 'pointer' }} // Changer le curseur pour indiquer que l'image est cliquable
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {prompt}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
