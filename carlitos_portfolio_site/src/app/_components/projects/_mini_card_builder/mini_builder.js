'use client'; // this allows access to document/window
import Tilt from 'react-parallax-tilt'; // Tilt functionality 
import Planet3D from "../_three_js_planet/page"; // 3D planet prebuilt
import Stars from "../_three_js_planet/stars/page"; // Star pattern prebuilt

import { IoArrowRedoCircleOutline } from "react-icons/io5";
import "./style.scss";

// Accept the new onCardSelect prop
const MiniCardBuilder = ({ cards, onCardSelect }) => {
  // If there's exactly one card, add "single-child" to the container
  const containerClass = cards.length === 1 
    ? "mini-container single-child" 
    : "mini-container";

  return (
    <section className={containerClass} >
      {cards.map((card, index) => {
        // Use the project’s global_position to determine its overall index.
        // (Assuming global_position is 1-indexed and matches the order in allProjects.)
        const cardIndex = card.global_position - 1;

        if (card.internal === "side-3js") {
          return (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={5}
              className={`mini-card mini-card${index + 1}`}
              onClick={() => onCardSelect(cardIndex)}

            >
              <h2 className="mini-card-title">{card.title}</h2>
              <i 
                className="fas fa-arrow-right"
                onClick={() => onCardSelect(cardIndex)}

                >
                <IoArrowRedoCircleOutline 
                  size={50} 
                  color="white"
                  onClick={() => onCardSelect(cardIndex)}
                />
              </i>
              <p className="mini-card-description">{card.description}</p>
              <div className={`pic pic-${index + 1}-${card.internal}`}>
                <Stars />
                <Planet3D />
              </div>
              <button className="mini-card-learn-button">
                {card.buttonText}
              </button>
            </Tilt>
          );
        } else {
          return (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={5}
              className={`mini-card mini-card${index + 1}`}
              onClick={() => onCardSelect(cardIndex)}

            >
              <h2 className="mini-card-title">{card.title}</h2>
              <i 
                className="fas fa-arrow-right"
                onClick={() => onCardSelect(cardIndex)}
              >
                <IoArrowRedoCircleOutline
                  size={50} 
                  color="white"
                  onClick={() => onCardSelect(cardIndex)}
                />
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
          );
        }
      })}
    </section>
  );
};

export default MiniCardBuilder;
