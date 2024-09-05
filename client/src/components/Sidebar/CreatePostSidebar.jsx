import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';
import '../../styles/CreatePostSidebar.css';

const CreatePostSidebar = () => {
  const [generationMode, setGenerationMode] = useState('fast');
  const [imageDimension, setImageDimension] = useState('medium');
  const [numberOfImages, setNumberOfImages] = useState(3);
  const [privateMode, setPrivateMode] = useState(false);

  const [promptEnhance, setPromptEnhance] = useState('Auto');
  const [presetStyle, setPresetStyle] = useState('Dynamic');
  const [contrast, setContrast] = useState('Medium');

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  const handleReset = () => {
    setGenerationMode('fast');
    setImageDimension('medium');
    setNumberOfImages(3);
    setPrivateMode(false);
    setPromptEnhance('Auto');
    setPresetStyle('Dynamic');
    setContrast('Medium');
  };

  const handleSave = () => {
    // Save the selected options
    const config = {
      generationMode,
      imageDimension,
      numberOfImages,
      privateMode,
      promptEnhance,
      presetStyle,
      contrast
    };
    // TODO: Implement the logic to save the config
    console.log(config);
  };

  return (
    <div className="createpost-sidebar">
      <div className="createpost-back-btn" onClick={handleRedirect}>
        ← Back to Home
      </div>

      <div className="createpost-title">Preset</div>

      <div className="createpost-dropdown createpost-item">
        <label>Prompt Enhance</label>
        <div className="custom-dropdown">
          <button className="dropdown-button">{promptEnhance}</button>
          <div className="dropdown-content">
            <div onClick={() => setPromptEnhance('Auto')}>Auto</div>
            <div onClick={() => setPromptEnhance('Manual')}>Manual</div>
          </div>
        </div>
      </div>

      <div className="createpost-dropdown createpost-item">
        <label>Preset Style</label>
        <div className="custom-dropdown">
          <button className="dropdown-button">{presetStyle}</button>
          <div className="dropdown-content">
            <div onClick={() => setPresetStyle('Dynamic')}>Dynamic</div>
            <div onClick={() => setPresetStyle('Static')}>Static</div>
          </div>
        </div>
      </div>

      <div className="createpost-dropdown createpost-item">
        <label>Contrast</label>
        <div className="custom-dropdown">
          <button className="dropdown-button">{contrast}</button>
          <div className="dropdown-content">
            <div onClick={() => setContrast('Low')}>Low</div>
            <div onClick={() => setContrast('Medium')}>Medium</div>
            <div onClick={() => setContrast('High')}>High</div>
          </div>
        </div>
      </div>

      <div className="createpost-title">Generation Mode</div>
      <div className="createpost-item createpost-generation-mode">
        <button
          className={generationMode === 'fast' ? 'active' : ''}
          onClick={() => setGenerationMode('fast')}
        >
          Fast
        </button>
        <button
          className={generationMode === 'quality' ? 'active' : ''}
          onClick={() => setGenerationMode('quality')}
        >
          Quality
        </button>
      </div>

      <div className="createpost-title">Image Dimensions</div>
      <div className="createpost-item createpost-image-dimensions">
        <button
          className={imageDimension === 'small' ? 'active' : ''}
          onClick={() => setImageDimension('small')}
        >
          Small
        </button>
        <button
          className={imageDimension === 'medium' ? 'active' : ''}
          onClick={() => setImageDimension('medium')}
        >
          Medium
        </button>
        <button
          className={imageDimension === 'large' ? 'active' : ''}
          onClick={() => setImageDimension('large')}
        >
          Large
        </button>
      </div>

      <div className="createpost-title">Number of Images</div>
      <div className="createpost-num-images createpost-item">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={numberOfImages === num ? 'active' : ''}
            onClick={() => setNumberOfImages(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="createpost-title">Private Mode</div>
      <div className="createpost-item createpost-switch">
        <label className="switch">
          <input
            type="checkbox"
            checked={privateMode}
            onChange={(e) => setPrivateMode(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="createpost-actions">
        <button className="createpost-save-btn" onClick={handleSave}>Save</button>
        <button className="createpost-reset-btn" onClick={handleReset}>Reset to Defaults</button>
      </div>
    </div>
  );
};

export default CreatePostSidebar;
