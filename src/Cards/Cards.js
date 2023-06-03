import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./CardsStyles.css";

import Card from "./Card";

const Cards = () => {

  const [flashcarddata, setFlashcarddata] = useState([]);
  const [current, setCurrent] = useState(0);


    useEffect(()=>{
        const fakeCards = [
            { id: "rec1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "1111", side2: "af en toe"}},
            { id: "qec1X3ATCwfeew2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "2222", side2: "af enee2e toe"}},
            { id: "aa1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "3333", side2: "af edwe2n toe"}},
            { id: "grgrg1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "44444", side2: "af edwdn toe"}}];

		setFlashcarddata(fakeCards);
	}, [])
    

  const handleSelect = (selectedIndex) => {
    setCurrent(selectedIndex);
  };


  return (
    <div>
        <Carousel activeIndex={current} onSelect={handleSelect}>
         {flashcarddata.map((card) => (
            <Carousel.Item>
                <Card card={card} key={card.id} />
            </Carousel.Item>
         ))}
    </Carousel>
    
    </div>

  );
};

export default Cards;
