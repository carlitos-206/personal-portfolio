import { useState } from 'react';

export default function ProjectContentCarousel({ projects }) {
  // Keep track of the current project index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle moving to the next project
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      // Move forward by 1, wrap to 0 if at the end
      return (prevIndex + 1) % projects.length;
    });
  };

  // Handle moving to the previous project
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      // Move backward by 1, wrap to the last if at the start
      return (prevIndex - 1 + projects.length) % projects.length;
    });
  };

  // Safeguard: If there are no projects, render a simple message
  if (!projects || projects.length === 0) {
    return <section className="project-content-section">No projects to display.</section>;
  }

  // Extract the current project
  const currentProject = projects[currentIndex];

  return (
    <section className='project-content-section'>
      <h1>{currentProject.title}</h1>
      {currentProject.content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext} style={{ marginLeft: '1rem' }}>Next</button>
      </div>
    </section>
  );
}
