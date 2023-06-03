import React, { useState, useEffect } from "react";
import "./CardsStyles.css";

import Card from "./Card";

const Cards = () => {

  const [flashcarddata, setFlashcarddata] = useState([]);

  useEffect(()=>{
    const fakeCards = [
      { id: "rec1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "1111", side2: "af en toe"}},
      { id: "qec1X3ATCwfeew2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "2222", side2: "af enee2e toe"}},
      { id: "aa1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "3333", side2: "af edwe2n toe"}},
      { id: "grgrg1X3ATCCrXl2csI", createdTime: "2020-11-10T16:59:09.000Z", fields: {side1: "44444", side2: "af edwdn toe"}}];
    setFlashcarddata(fakeCards);
  }, [])
    

  const cards = flashcarddata.map((card) => {
    return <Card card={card} key={card.id} />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  return (
    <div>
      {/* number of cards */}
      {flashcarddata && flashcarddata.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {flashcarddata.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}



      {/* render cards */}
      {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
      {/* /render cards */}



      {/* render nav buttons */}
      <div className="nav">
        {current > 0 ? (
          <button onClick={previousCard}>Previous card</button>
        ) : (
          <button className="disabled" disabled>
            Previous card
          </button>
        )}
        {current < flashcarddata.length - 1 ? (
          <button onClick={nextCard}>Next card</button>
        ) : (
          <button className="disabled" disabled>
            Next card
          </button>
        )}
        {/* /render nav buttons */}


      </div>
    </div>
  );
};

export default Cards;
