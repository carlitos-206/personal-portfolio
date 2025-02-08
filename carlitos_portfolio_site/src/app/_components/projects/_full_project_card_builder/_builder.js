import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BsArrowBarUp } from "react-icons/bs";
import { BsArrowBarDown } from "react-icons/bs";
import Planet3D from "../_three_js_planet/page"; // 3D planet prebuilt
import Stars from "../_three_js_planet/stars/page"; // Star pattern prebuilt

import './layout.css';

export default function ProjectContentCarousel({ projects, position, onClose }) {
  // Track current carousel position
  const [currentIndex, setCurrentIndex] = useState(1);
  // Create a ref to the content container
  const contentRef = useRef(null);

  // Scroll into view each time the current project changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(position);
  }, [position]);

  // Cleanup in case the component unmounts unexpectedly:
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // If there are no projects, display a simple message
  if (!projects || projects.length === 0) {
    return <section className="project-content-section">No projects to display.</section>;
  }

  // Jump to next project; wrap around to first after last
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  // Jump to previous project; wrap around to last before first
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    // Overlay div: clicking on it will trigger onClose
    <div className="carousel-overlay" onClick={onClose}>
      <section className="project-content-section" ref={contentRef}>
        {/* Stop propagation so clicks inside the card don't close the modal */}
        <div className='project-content-card' onClick={(e) => e.stopPropagation()}>
          <div className='project-content-card-header'>
            {currentProject.internal === "side-3js" ? 
                <>
                    <Stars />
                </>
                :
                <>
                    <Image
                        src={currentProject.image}
                        alt='image'
                        width={350}
                        height={300}
                    />    
            </>
            }
            <div className='project-content-header-title'>
              <div className='project-content-title-text'>
                <h1>{currentProject.title}</h1>
                {
                        currentProject.socials.map((item, key)=>{
                            return(
                                <p key={key}>
                                    {item}
                                </p>
                            )
                        })
                    }
              </div>
            </div>
          </div>
          
          <div className='project-content-card-body'>
            {currentProject.content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <div className='project-language-container'>
              {currentProject.languages.map((item, index) => (
                <p key={index}>#{item}</p>
              ))}
            </div>
          </div>
          <div className='project-content-buttons-container'>
            <BsArrowBarUp 
              onClick={handlePrev}
              size={32}
              className='project-card-carousel-arrows'
            />
            <BsArrowBarDown
              onClick={handleNext} 
              size={32}
              className='project-card-carousel-arrows'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
