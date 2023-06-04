import './FileUpload.css';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Cards from './Cards/Cards';
import Icon from './img/ic-icon-header.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import GaugeChart from 'react-gauge-chart'



const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(0)

  useEffect(() => {
    renderGauge();
  }, [])

  const renderGauge = () => {
    return (
      <div>
        <GaugeChart id="gauge-chart1" 
          nrOfLevels={20}
          colors={["#FF5F6D", "#FFC371"]} 
          arcWidth={0.3} 
          percent={result}
          textColor="#FF5F6D"
        />
      </div>
    )
    }


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
      <div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"  
          centered show={showModal} 
          onHide={() => setShowModal(false)} 
          className="w-100 p-3" 
          style={{ color: "#fff" }}>
            <Cards result={result} setResult={setResult}/>
            {showModal && renderGauge()}
        </Modal>
      </div>
        
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
        <h1>IntelliCards</h1>
      </div>
      <div className="container">
        <div class="row upload-row">
        <div class="col-12">
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
            <button onClick={handleUpload} className="btn btn-success upload-button">
              Upload
            </button>
          </div>          
        </div>
        <div class="col-12 file-history">
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
