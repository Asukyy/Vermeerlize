import React, { useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import '../styles/CanvasEditor.css'; // Le fichier CSS à modifier/créer

const CanvasEditor = () => {
  const { editor, onReady } = useFabricJSEditor();
  const [textValue, setTextValue] = useState('');
  const [fillColor, setFillColor] = useState('#FF8C00'); // Couleur par défaut
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [activeObject, setActiveObject] = useState(null);

  // Fonction pour ajouter un cercle
  const onAddCircle = () => {
    editor?.addCircle({
      radius: 50,
      fill: fillColor,
      left: 100,
      top: 100,
    });
  };

  // Fonction pour ajouter un rectangle
  const onAddRectangle = () => {
    editor?.addRectangle({
      width: 100,
      height: 60,
      fill: fillColor,
      left: 150,
      top: 100,
    });
  };

  // Fonction pour ajouter du texte
  const onAddText = () => {
    editor?.addText(textValue || 'Sample Text', {
      left: 200,
      top: 150,
      fontSize: 20,
      fill: fillColor,
    });
    setTextValue('');
  };

  // Fonction pour télécharger une image
  const onUploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (f) => {
      const img = new Image();
      img.src = f.target.result;
      img.onload = () => {
        editor?.canvas?.add(new window.fabric.Image(img, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        }));
      };
    };
    reader.readAsDataURL(file);
  };

  // Fonction pour changer la couleur de remplissage de l'objet sélectionné
  const onChangeFillColor = (color) => {
    setFillColor(color);
    if (editor?.canvas.getActiveObject()) {
      editor?.canvas.getActiveObject().set('fill', color);
      editor?.canvas.renderAll();
    }
  };

  // Fonction pour changer la couleur des bordures de l'objet sélectionné
  const onChangeStrokeColor = (color) => {
    setStrokeColor(color);
    if (editor?.canvas.getActiveObject()) {
      editor?.canvas.getActiveObject().set('stroke', color);
      editor?.canvas.renderAll();
    }
  };

  // Sauvegarde du canevas au format image
  const onSave = () => {
    const canvasDataURL = editor?.canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.href = canvasDataURL;
    link.download = 'canvas.png';
    link.click();
  };

  // Suivi de l'objet actif pour gestion des couleurs
  const onSelectionChanged = () => {
    const activeObj = editor?.canvas.getActiveObject();
    setActiveObject(activeObj);
    if (activeObj) {
      setFillColor(activeObj.fill || '#FF8C00');
      setStrokeColor(activeObj.stroke || '#000000');
    }
  };

  return (
    <div className="canvas-editor-container">
      <div className="toolbar">
        <div className="tool-section">
          <button onClick={onAddCircle}>Add Circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Enter text"
          />
          <button onClick={onAddText}>Add Text</button>
        </div>
        <div className="tool-section">
          <input
            type="color"
            value={fillColor}
            onChange={(e) => onChangeFillColor(e.target.value)}
            title="Change Fill Color"
          />
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => onChangeStrokeColor(e.target.value)}
            title="Change Stroke Color"
          />
        </div>
        <div className="tool-section">
          <input type="file" onChange={onUploadImage} accept="image/*" />
          <button onClick={onSave}>Save Canvas</button>
        </div>
      </div>
      <div className="canvas-container">
        <FabricJSCanvas className="sample-canvas" onReady={onReady} onSelection={onSelectionChanged} />
      </div>
    </div>
  );
};

export default CanvasEditor;
