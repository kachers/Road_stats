import React from 'react';
import ChooseFile from '../components/ChooseFile';
import DragAndDrop from '../components/DragAndDrop';
import './Upload.css'; // Import the CSS file

const Upload: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <h2>Upload Page</h2>
      <DragAndDrop />
      <p>or</p>
      <ChooseFile />
    </div>
  );
}

export default Upload;