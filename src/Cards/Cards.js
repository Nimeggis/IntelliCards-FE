import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./CardsStyles.css";
import Card from "./Card";
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';

const Cards = ({result, setResult, data}) => {

  const [flashcarddata, setFlashcarddata] = useState([]);
  const [current, setCurrent] = useState(0);
  const [parentSide, setParentSide] = useState(true);
  
  //if 0: no response, 1: success, 2:failure
  const [success, setSuccess] = useState(0);
  //const [results, setResults] = useState([]);


  useEffect(() => {
    setFlashcarddata(data);
  }, [data])

  //to do
  /*useEffect(() => {
    if ((!current.includes(results.id)) || (results == null)) {
        const tmp = {id: current, result: success}
      setResults(results => [...results, tmp]);
    }
  }, [success])
   */

  const increaseSuccess = () => {
    setSuccess(1);
    setResult(result+0.1);
  }
  const increaseFailure = () => {
    setSuccess(2);
    console.log(success);
    setResult(result+0.1);
  }





  const handleSelect = (selectedIndex) => {
    setCurrent(selectedIndex);
    setParentSide(true);
  };



  const getChildSide = (side) => {
    setParentSide(side)
  }



  return (
    <div>
        <Carousel activeIndex={current} onSelect={handleSelect} interval={null}>
         {flashcarddata.map((card) => (
            <Carousel.Item>
                <Card parentCallback={getChildSide} card={card} key={card.id} />
            </Carousel.Item>
         ))}
      </Carousel>

      <div className="nav">
        {!parentSide ? (
          <button class="flashTrue" onClick={increaseSuccess}><FaThumbsUp/> Knew it!</button>
        ) : (
          <button className="disabled flashTrue" disabled>
            <FaThumbsUp/> Knew it!
          </button>
        )}
        {!parentSide ? (
            <button class="flashFalse" onClick={increaseFailure}><FaThumbsDown/> Didn't know</button>
        ) : (
          <button className="disabled flashFalse" disabled>
            <FaThumbsDown/> Didn't know
          </button>
        )}
      </div>
    </div>

  );
};

export default Cards;
