'use client';
import "./style.scss";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { FaFileCode } from "react-icons/fa6";
import { FaComputerMouse } from "react-icons/fa6";
import { TbBrandNpm } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";

import Tilt from 'react-parallax-tilt';

const CardBuilder = ({ cards }) => {
    return (
        <section className="container">
            {cards.map((card, index) => (
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={5}
              className={`card card${index + 1}`}
              key={index}
            >
                <h2 className="card-title">{card.title}</h2>
                <i className="fas fa-arrow-right">
                    <IoArrowRedoCircleOutline size={100}/>
                </i>
                <p>{card.description}</p>
                <div className="pic" style={{ backgroundImage: `url(${card.image})` }}></div>
                  <ul className="dots-list">
                    {Array.from({ length: 32 }).map((_, liIndex) => (
                      <li className="dots" key={liIndex}></li>
                    ))}
                  </ul>
                <div className="social">
                  {card.socials.map((social, socialIndex) => {
                    if (social === "Code") {
                      return (
                        <div key={socialIndex} className="social-item code social-icon">
                          <FaFileCode size={18} /> Source Code
                        </div>
                      );
                    }
                    if (social === "Demo") {
                      return (
                        <div key={socialIndex} className="social-item demo social-icon">
                          <FaComputerMouse  /> Demo
                        </div>
                      );
                    }
                    if (social === "NPM") {
                      return (
                        <div key={socialIndex} className="social-item npm social-icon">
                          <TbBrandNpm size={32} /> Package Docs
                        </div>
                      );
                    }
                    if(social.startsWith("Watch")){
                      return(
                        <div key={socialIndex} className="social-item npm social-icon">
                          <FaYoutube size={32} /> {social}
                        </div>
                      )
                    }
                  })}
                </div>
                <button className="card-learn-button">{card.buttonText}</button>
            </Tilt>
        ))}
    </section>
    );
};

export default CardBuilder;