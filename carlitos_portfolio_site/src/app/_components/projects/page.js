'use client';
import CardBuilder from './_card_builder/builder';
import MiniCardBuilder from './_mini_card_builder/mini_builder';

import "./layout.css";
import { personal_projects, hackathon_projects, side_projects } from './_data/projects_data';
export default function Projects() {
    return (
        <section id="projects" className="projects-section">
            <h1 className='projects-title'>Personal Projects</h1>
            <MiniCardBuilder cards={personal_projects} />
            <h1 className='projects-title'>Hackathon Projects</h1>
            <MiniCardBuilder cards={hackathon_projects} />
            <h1 className='projects-title'>Side Projects</h1>
            <MiniCardBuilder cards={side_projects} />
        </section>
    );
}