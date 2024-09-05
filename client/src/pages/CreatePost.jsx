import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css'; // Nouveau fichier CSS

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
          navigate('/personal-feed');
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
    <div className="createpost-container">
      <div className="createpost-header">
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="createpost-input"
        />
        <input
          type="text"
          placeholder="Enter Prompt"
          name="prompt"
          value={form.prompt}
          onChange={handleChange}
          className="createpost-input"
        />
        <button
          onClick={handleGenerateImage}
          className={`createpost-generate-btn ${generatingImg ? 'loading' : ''}`}
          disabled={generatingImg}
        >
          {generatingImg ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {form.imageUrl && (
        <div className="createpost-image-preview">
          <img src={form.imageUrl} alt="Generated" />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="createpost-submit-btn"
        disabled={loading || !form.imageUrl}
      >
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </div>
  );
};

export default CreatePost;
