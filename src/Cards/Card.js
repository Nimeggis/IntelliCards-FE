import React, { useState } from "react";


const Card = ({ parentCallback, card }) => {

  const [side, setSide] = useState();

  const handleClick = () => {
    setSide(!side);
    parentCallback(side);
  }

  return (
    <div className={`card ${side ? "side" : ""}`} onClick={handleClick}>
      <small>
        <span>Card ID</span>
        {card.id}
      </small>
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className="front">{card.fields.side1}</div>
      <div className="back">{card.fields.side2}</div>
    </div>
  );
}
export default Card;
