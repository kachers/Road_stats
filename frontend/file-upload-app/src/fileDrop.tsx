import { DragEvent, useState } from 'react';
 
export function FileDrop() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
 
  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };
 
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };
 
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
 
    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
 
    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
        const reader = new FileReader();
      
        reader.onloadend = () => {
          console.log(reader.result);
        };
      
        reader.onerror = () => {
          console.error('There was an issue reading the file.');
        };
        
        const promise = new Promise((resolve, reject) => {
          reader.onload = resolve;
          reader.onerror = reject;
        });
        
        promise.then(() => {
          return reader.readAsText(file);
      });
    });
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
    </div>
  );
}

export default FileDrop;