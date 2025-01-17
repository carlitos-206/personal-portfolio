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

            <div className="experience-section bg-gray-100 py-12">
  <h2 className="text-3xl font-bold text-teal-600 mb-6">Professional Experience</h2>
  <div className="timeline relative border-l-2 border-teal-500">
    {/* EasySpeak Role */}
    <div className="experience-item mb-8 ml-6">
      <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2"></div>
      <h3 className="text-xl font-semibold">Lead Software Engineer</h3>
      <p className="text-sm text-gray-500">EasySpeak | Remote | Aug. 2023 - June 2024</p>
      <ul className="list-disc ml-4 mt-2 text-gray-700">
        <li>Developed a responsive web platform using React.js with Netlify.</li>
        <li>Built a cross-platform mobile app using React Native.</li>
        <li>Designed backend architecture with Python and Flask for secure and scalable infrastructure.</li>
        <li>Optimized Firebase for cross-platform usability and scalability.</li>
        <li>Led AI initiatives, including machine learning research and accent detection development.</li>
        <li>Coordinated DevOps with comprehensive backend testing suites.</li>
      </ul>
    </div>

    {/* Compass Group - Lead Kitchen Cook */}
    <div className="experience-item mb-8 ml-6">
      <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2"></div>
      <h3 className="text-xl font-semibold">Lead Kitchen Cook</h3>
      <p className="text-sm text-gray-500">Compass Group @ Google | Seattle, WA | Jan. 2020 – Oct. 2024</p>
      <ul className="list-disc ml-4 mt-2 text-gray-700">
        <li>Designed seasonal menus using locally sourced products.</li>
        <li>Integrated AI tools like ChatGPT to create innovative menus.</li>
        <li>Reduced food waste using data-driven tracking systems.</li>
        <li>Led a team to serve over 400 guests daily.</li>
      </ul>
    </div>

    {/* Compass Group - Warehouse Attendant */}
    <div className="experience-item mb-8 ml-6">
      <div className="absolute w-4 h-4 bg-teal-500 rounded-full -left-2"></div>
      <h3 className="text-xl font-semibold">Warehouse Attendant</h3>
      <p className="text-sm text-gray-500">Compass Group @ Google | Seattle, WA | Oct. 2024 – Present</p>
      <ul className="list-disc ml-4 mt-2 text-gray-700">
        <li>Inspected and ensured products met safety guidelines.</li>
        <li>Tracked inventory and financial records with precision.</li>
        <li>Streamlined product flow with FIFO systems.</li>
      </ul>
    </div>
  </div>
</div>

        </section>
    );
}