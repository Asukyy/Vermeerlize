import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';

const CreatePost = ({ user }) => {
  const [form, setForm] = useState({
    title: '',
    prompt: '',
    imageUrl: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        if (response.ok) {
          setForm({ ...form, imageUrl: `data:image/jpeg;base64,${data.photo}` });
        } else {
          alert(data.message || 'Something went wrong while generating the image.');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (form.prompt && form.imageUrl) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.title,
            prompt: form.prompt,
            photo: form.imageUrl,
            userId: user._id, // Assurez-vous que user._id est correct
          }),
        });

        const result = await response.json();
        if (response.ok) {
          navigate('/');
        } else {
          alert(result.message || 'Something went wrong');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred, please try again later');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Create a New Post
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Prompt"
              variant="outlined"
              fullWidth
              margin="normal"
              name="prompt"
              value={form.prompt}
              onChange={handleChange}
              required
            />

            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ImageIcon />}
                onClick={handleGenerateImage}
                disabled={generatingImg}
              >
                {generatingImg ? <CircularProgress size={24} /> : 'Generate Image'}
              </Button>
            </Box>

            {form.imageUrl && (
              <Box display="flex" justifyContent="center" mt={2}>
                <img src={form.imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} />
              </Box>
            )}

            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<SaveIcon />}
                disabled={loading || !form.imageUrl}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Post'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;
