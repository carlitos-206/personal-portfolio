import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import './layout.css'
export default function ProjectContentCarousel({ projects, position }) {
  // Track current carousel position
  const [currentIndex, setCurrentIndex] = useState(null);

  // Create a ref to the content container
  const contentRef = useRef(null);

  // Scroll into view each time the current project changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'auto', // or 'auto' if you prefer instant
        block: 'start',
      });
    }
  }, [currentIndex]);
  useEffect(()=>{
    setCurrentIndex(position)
  })
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

  // Current project to display
  const currentProject = projects[currentIndex];

  return (
    <section className="project-content-section" ref={contentRef}>
<h1>{currentProject.title}</h1>
<h3>{currentProject.description}</h3>
<Image
    src={currentProject.image}
    alt='image'
    width={100}
    height={100}
    />
{
    currentProject.socials.map((item, index)=>{
        return(
            <button key={index}>{item}</button>
        )
    })
}
{
    currentProject.content.map((item, index) => (
        <p key={index}>{item}</p>
    ))
}
{
    currentProject.languages.map((item, index)=>{
        return(
            <p key={index}>#{item}</p>
        )
    })
}            {
    currentProject.frameworks.map((item, index)=>{
        return(
            <p key={index}>#{item}</p>
        )
    })
}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext} style={{ marginLeft: '1rem' }}>Next</button>
      </div>
    </section>
  );
}
