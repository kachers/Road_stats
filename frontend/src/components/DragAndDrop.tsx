import { DragEvent, useState } from 'react';

const DragAndDrop: React.FC = () => {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    const formData = new FormData();
    formData.append('file', droppedFiles[0]);

    try {
      const response = await fetch('http://localhost:8080/user/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setConfirmationVisible(true);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px',
        width: '900px',
        border: '1px dotted',
        borderColor: 'black',
        backgroundColor: isOver ? '#cbccce' : 'white',
        color: 'black',
      }}
    >
      Drag and drop your file here
      {confirmationVisible && (
        <div className="confirmation">
          <p>File uploaded successfully!</p>
          <button onClick={() => setConfirmationVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;