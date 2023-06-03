import React, { useState } from 'react';
import './FileUpload.css';


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {

    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    if (selectedFile && (selectedFile.type === 'application/pdf') || (selectedFile.type === 'text/plain')) {
      console.log(selectedFile);
      setUploadedFiles(uploadedFiles => [...uploadedFiles, selectedFile]);

    } else {
      alert('Only PDF files are allowed.');
    }

  };

  

  return (
    <div className="wrapper">

      <div className="container">
        <div className="header">
          <h1>Flashcard Generation through AI</h1>
        </div>
        <div class="row">
        <div class="col-8">
          <div className="content">
            <h2>Upload PDF</h2>
            <div className="file-input">
              <label class="form-label" for="customFile">Choose File</label>
              <input type="file" class="form-control" id="customFile" onChange={handleFileChange}/>
            </div>
            <div className="file-drop" onDrop={handleDrop} onDragOver={handleDragOver}>
              <p>Drag and drop files here</p>
            </div>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            <button onClick={handleUpload} className="btn btn-success">
              Upload
            </button>
          </div>          
        </div>
        <div class="col-4">
          <div className="content">
            <h3>Uploaded Files History</h3>
            <div className="list-group">
              {uploadedFiles.map((file, index) => (
                <button type="button" class="list-group-item list-group-item-action">
                  {file.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>

      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Iteratec Cloud-Hackathon. All rights reserved.
      </footer>
    </div>

    
  );
};

export default FileUpload;
