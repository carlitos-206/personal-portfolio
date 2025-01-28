/* 
  This file is the builder for the cards in Projects section
*/

'use client'; // this allows access to document.windows()
import Tilt from 'react-parallax-tilt'; // Tilt functionality 
import Planet3D from "../_three_js_planet/page"; // 3D planet prebuilt
import Stars from "../_three_js_planet/stars/page"; // Star pattern prebuilt
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import "./style.scss";

const MiniCardBuilder = ({ cards }) => { // The function takes cards which is an array
 
  // If there's exactly one card, add "single-child" to the container
  const containerClass = cards.length === 1 
    ? "mini-container single-child" 
    : "mini-container";

  return (
    <section className={containerClass}>
      {
      
        cards.map((card, index) =>{
      
        // this is an exception to build the project that contains the 3js component
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
        }else{ // this is the universal card build
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
      })
    }
    </section>
  );
};

export default MiniCardBuilder;
