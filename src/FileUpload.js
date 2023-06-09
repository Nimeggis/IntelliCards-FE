import './FileUpload.css';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Cards from './Cards/Cards';
import Icon from './img/ic-icon-header.png';
import GaugeChart from 'react-gauge-chart'
import axios from 'axios';
import { MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';



const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [result, setResult] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
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
    renderGauge();
  }, [result])

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
      
      sendFile(selectedFile);

      //console.log(selectedFile);
      popUpCard(selectedFile)
      if (!uploadedFiles.includes(selectedFile)) {
        setUploadedFiles(uploadedFiles => [...uploadedFiles, selectedFile]);
      }
    } else {
      alert('Only .pdf and .txt files are allowed.');
    }
  };

  const sendFile = async (file) => {  
    console.log("Sending File...")

      const formData = new FormData();
      formData.append("file", file);
      try {
        const request = await axios.post("http://85.214.90.195:9090/file-without-graphql/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          },
        });
    
        console.log("Sending request:", request.data);
        setData(request.data);

        setShowModal(true)
        setShowSpinner(false);
        setShowCards(true);
      } catch (error) {
        console.error("Upload failed:", error);
      }
  };
  

  const renderModal = () => {
    console.log(selectedFile)
    const paddingValue = showSpinner ? '70px' : '0px';
    return (
      <div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"  
          centered show={showModal} 
          onHide={() => setShowModal(false)} 
          className="w-100 p-3" 
          style={{ color: "#fff" }}>
            { showCards && <Cards result={result} setResult={setResult} data={data}/>}
            {/*{showModal && renderGauge()}*/}
            <div style={{ alignItems: 'center',  position: 'center', padding: paddingValue, textAlign:'center'}}>
              {showSpinner && 
              <MDBBtn disabled>
                <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' />
                Loading...
              </MDBBtn>
              }
            </div>
        </Modal>
      </div>
        
    );
  }

  const popUpCard = (File) => {
    setSelectedFile(File)

    setShowModal(true);
    setShowCards(false);
    setShowSpinner(true);
    console.log("spinner", showSpinner);
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
