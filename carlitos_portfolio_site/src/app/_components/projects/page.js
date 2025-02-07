/*
  This is the 'Root' component for the Projects section
*/
import { useState, useEffect } from 'react';
import MiniCardBuilder from './_mini_card_builder/mini_builder'; // custom component
import { 
  personal_projects, 
  hackathon_projects, 
  side_projects 
} from './_data/projects_data'; // This a collection of Arrays with projects data
import ProjectContentCarousel from './_full_project_card_builder/_builder';
import "./layout.css";

export default function Projects() {
  const [allProjects, setAllProjects] = useState([])
  useEffect(()=>{
    setAllProjects([
      ...personal_projects,
      ...hackathon_projects,
      ...side_projects
    ]);
  }, []);

  console.log(`
    All Projects: ${allProjects}
    `)
    return (
        <section id="projects" className="projects-section">
            <h1 className='projects-title'>Personal Projects</h1>
            <MiniCardBuilder cards={personal_projects} />
            <h1 className='projects-title'>Hackathon Projects</h1>
            <MiniCardBuilder cards={hackathon_projects} />
            <h1 className='projects-title'>Side Projects</h1>
            <MiniCardBuilder cards={side_projects} />
            <ProjectContentCarousel projects={allProjects} position={0}/>
        </section>
    );
}