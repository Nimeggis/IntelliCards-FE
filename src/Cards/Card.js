import React, { useState } from "react";


const Card = ({ parentCallback, card }) => {

  const [side, setSide] = useState();

  const handleClick = () => {
    setSide(!side);
    parentCallback(side);
  }

  return (
    <div className={`card ${side ? "side" : ""}`} onClick={handleClick}>
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className="front">{card.question}</div>
      <div className="back">{card.answer}</div>
    </div>
  );
}
export default Card;
