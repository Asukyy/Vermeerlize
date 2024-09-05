import React, { useState } from 'react';
import '../styles/UniversalUpscaler.css';

const UniversalUpscaler = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [upscalingFactor, setUpscalingFactor] = useState(2); // Facteur d'upscaling par défaut
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = async () => {
    if (!selectedImage) return alert('Please upload an image first.');
    setLoading(true);

    // Simulate the upscale process (replace with actual API call)
    setTimeout(() => {
      setUpscaledImage(selectedImage); // Mocked result
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="upscaler-container">
      <h1 className="upscaler-title">Universal Upscaler</h1>

      <div className="upscaler-upload">
        <label htmlFor="upload-input" className="upscaler-upload-label">
          {selectedImage ? 'Change Image' : 'Upload Image'}
        </label>
        <input
          type="file"
          id="upload-input"
          className="upscaler-upload-input"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {selectedImage && (
        <div className="upscaler-options">
          <div className="upscaler-preview">
            <h2 className="upscaler-preview-title">Original Image</h2>
            <img src={selectedImage} alt="Uploaded" className="upscaler-image" />
          </div>

          <div className="upscaler-factors">
            <h3>Upscaling Factor</h3>
            <select
              value={upscalingFactor}
              onChange={(e) => setUpscalingFactor(Number(e.target.value))}
              className="upscaler-select"
            >
              <option value={2}>2x</option>
              <option value={4}>4x</option>
              <option value={8}>8x</option>
            </select>

            <button
              onClick={handleUpscale}
              className={`upscaler-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Upscaling...' : 'Upscale Image'}
            </button>
          </div>
        </div>
      )}

      {upscaledImage && (
        <div className="upscaler-result">
          <h2 className="upscaler-preview-title">Upscaled Image</h2>
          <img src={upscaledImage} alt="Upscaled" className="upscaler-image" />
        </div>
      )}
    </div>
  );
};

export default UniversalUpscaler;
