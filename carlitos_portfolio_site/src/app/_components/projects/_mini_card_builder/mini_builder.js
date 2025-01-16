'use client';

import "./style.scss";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import Tilt from 'react-parallax-tilt';
import Planet3D from "../_three_js_planet/page";
import Stars from "../_three_js_planet/stars/page";
const MiniCardBuilder = ({ cards }) => {
  // If there's exactly one card, add "single-child" to the container
  const containerClass = cards.length === 1 
    ? "mini-container single-child" 
    : "mini-container";

  return (
    <section className={containerClass}>
      {cards.map((card, index) =>{
        if(card.internal === "side-3js"){
            return(
                <Tilt
                  key={index}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={5}
                  className={`mini-card mini-card${index + 1}`}
                >
                  <h2 className="mini-card-title">{card.title}</h2>
                  <i className="fas fa-arrow-right">
                    <IoArrowRedoCircleOutline size={50} color="white" />
                  </i>
                  <p className="mini-card-description">{card.description}</p>
                  <div
                    className={`pic pic-${index + 1}-${card.internal}`}
                  >
                    <Stars />
                    <Planet3D />
                  </div>
                  <button className="mini-card-learn-button">
                    {card.buttonText}
                  </button>
                </Tilt>
            )
        }else{
            return(
                <Tilt
                  key={index}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={5}
                  className={`mini-card mini-card${index + 1}`}
                >
                  <h2 className="mini-card-title">{card.title}</h2>
                  <i className="fas fa-arrow-right">
                    <IoArrowRedoCircleOutline size={50} color="white" />
                  </i>
                  <p className="mini-card-description">{card.description}</p>
                  <div
                    className={`pic pic-${index + 1}-${card.internal}`}
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <button className="mini-card-learn-button">
                    {card.buttonText}
                  </button>
                </Tilt>
            )
        }
    })}
    </section>
  );
};

export default MiniCardBuilder;
