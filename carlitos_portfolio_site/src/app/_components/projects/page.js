'use client';
import CardBuilder from './_card_builder/builder';
import "./layout.css";
import { personal_projects, hackathon_projects } from './_data/projects_data';
export default function Projects() {
    return (
        <section className="projects-section">
            <h1 className='projects-title'>Personal Projects</h1>
            <CardBuilder cards={personal_projects} />
            <h1 className='projects-title'>Hackathon Projects</h1>
            <CardBuilder cards={hackathon_projects} />
        </section>
    );
}