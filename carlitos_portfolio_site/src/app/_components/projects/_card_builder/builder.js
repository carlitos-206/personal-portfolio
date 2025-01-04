'use client';
import "./style.scss";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { FaFileCode } from "react-icons/fa6";
import { FaComputerMouse } from "react-icons/fa6";
import { TbBrandNpm } from "react-icons/tb";

const CardBuilder = ({ cards }) => {
    return (
        <section className="container">
            {cards.map((card, index) => (
            <div key={index} className={`card card${index + 1}`}>
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
  })}
</div>

            <button className="card-learn-button">{card.buttonText}</button>
        </div>
        ))}
    </section>
    );
};

export default CardBuilder;