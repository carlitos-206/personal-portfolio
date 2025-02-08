'use client';
import { useState, useEffect } from 'react';
import MiniCardBuilder from './_mini_card_builder/mini_builder'; 
import ProjectContentCarousel from './_full_project_card_builder/_builder'; 
import { 
  personal_projects, 
  hackathon_projects, 
  side_projects 
} from "./_data/projects_data";
import "./layout.css";

export default function Projects() {
  // Combine all projects (assumes the global_position values are sequential)
  const [allProjects, setAllProjects] = useState([]);
  // State for showing the carousel and its starting position
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);

  useEffect(() => {
    setAllProjects([
      ...personal_projects,
      ...hackathon_projects,
      ...side_projects
    ]);
  }, []);

  // Callback for when a mini card is clicked.
  const handleCardSelect = (index) => {
    setCarouselPosition(index);
    setShowCarousel(true);
    // Disable page scroll
    document.body.style.overflow = 'hidden';
  };

  // Callback to close the carousel and re-enable scroll
  const handleCloseCarousel = () => {
    setShowCarousel(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="projects-section">
      <h1 className='projects-title'>Personal Projects</h1>
      <MiniCardBuilder cards={personal_projects} onCardSelect={handleCardSelect} />

      <h1 className='projects-title'>Hackathon Projects</h1>
      <MiniCardBuilder cards={hackathon_projects} onCardSelect={handleCardSelect} />

      <h1 className='projects-title'>Side Projects</h1>
      <MiniCardBuilder cards={side_projects} onCardSelect={handleCardSelect} />

      {/* Only show the carousel when a card has been clicked */}
      {showCarousel && (
        <ProjectContentCarousel 
          projects={allProjects} 
          position={carouselPosition}
          onClose={handleCloseCarousel}
        />
      )}
    </section>
  );
}
