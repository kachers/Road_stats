import React, { useState } from 'react';

const ChooseFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/user/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setConfirmationVisible(true);
        // Handle your response from the backend here
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Confirmation message */}
      {confirmationVisible && (
        <div className="confirmation">
          <p>File uploaded successfully!</p>
          <button onClick={() => setConfirmationVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ChooseFile;