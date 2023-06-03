import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './FileUpload.css';
import Icon from './img/ic-icon-header.png';


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);




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
    if (selectedFile === null){
      alert('No file was selected.');
      return 
    }
    if ((selectedFile && (selectedFile.type === 'application/pdf')) || (selectedFile.type === 'text/plain')) {
      //console.log(selectedFile);
      popUpCard(selectedFile)
      if (!uploadedFiles.includes(selectedFile)) {
        setUploadedFiles(uploadedFiles => [...uploadedFiles, selectedFile]);
      }
    } else {
      alert('Only .pdf and .txt files are allowed.');
    }
  };


  const renderModal = () => {

    console.log(selectedFile)
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Flashcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The selected file:  {selectedFile.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const popUpCard = (File) => {
    setSelectedFile(File)
    setShowModal(true);
  }

  return (
    <div className="wrapper">
      <div className="header">
        <img src={Icon} alt="IntelliCards Icon" class="header-icon"/>
        <h1>Flashcard Generation through AI</h1>
      </div>
      <div className="container">
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
                <button type="button" class="list-group-item list-group-item-action"  onClick={() => popUpCard(file)}>
                  <h6 className="long-string">
                    {file.name}
                  </h6>
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
      {showModal && renderModal()}
    </div>
  );
};

export default FileUpload;
