/* 
  This file holds the rendering for mobile screens
  1350px - 550px
*/
'use client'
import { useState } from "react"
import Image from "next/image"
import './layout.css'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Mobile_Expirience({ exp_data }) {
    // Use a single index to track the current slide
    const [currentIndex, setCurrentIndex] = useState(0);

    // If there’s no data, bail out gracefully
    if (!exp_data || exp_data.length === 0) {
        return null;
    }

    // Current data
    const data = exp_data[currentIndex];

    // Compute the previous and next indices with modular arithmetic
    const prevIndex = (currentIndex - 1 + exp_data.length) % exp_data.length;
    const nextIndex = (currentIndex + 1) % exp_data.length;

    // Fetch the previous and next data
    const prevData = exp_data[prevIndex];
    const nextData = exp_data[nextIndex];

    return (
        <div className="mobile-tab-container">
            <div className="mobile-tab-background">
                <h1 className="tabs-main-title">Résumé</h1>
                <div className="mobile-tab-card">
                    <Image
                        src={data.image}
                        width={450}
                        height={600}
                        className="mobile-tab-image"
                        alt={data.title}
                    />
                    <div id={`mobile-data-list-id-${data.id}-whole`} className="mobile-tab-text-container">
                        {
                            data.title ? 
                            (<h1 className="mobile-text-shadow">{data.title}</h1>) 
                            : (<></>)
                        }
                        {
                            /* Conditionally render job info if all fields exist */
                            data.job_title && data.job_site && data.job_dates && (
                                <h6 className="mobile-text-shadow">
                                    {data.job_title} | {data.job_site} | {data.job_dates}
                                </h6>
                            )
                        }
                        <ul id={`mobile-data-list-id-${data.id}-text`} className="mobile-data-list">
                            {
                                /* Render bullet points */
                                data.points.map((item, i) => (
                                    <li id={`mobile-data-list-id-${data.id}-shadow`} className="mobile-text-shadow" key={i}>
                                        + {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mobile-tab-controler-container">
                <div className="mobile-tab-controler-box">
                    <button 
                        className="mobile-tab-controler-buttons"
                        onClick={() => setCurrentIndex(prevIndex)}
                    >
                        <FaArrowLeft /> {prevData.type}
                    </button>
                    
                    <h1 className="tabs-main-title">{data.type}</h1>
                    
                    <button 
                        className="mobile-tab-controler-buttons"
                        onClick={() => setCurrentIndex(nextIndex)}
                    >
                        {nextData.type} <FaArrowRight />
                    </button>
                </div>
            </div>
            <div className="tab-content-footer">
                    <button id="mobile-tab-button-footer" className="tab-button-footer">
                        <a 
                            href="/Resume.pdf" 
                            download="Carlos_Caceres_Resume" 
                        >
                            Download Resume
                        </a>
                    </button>
            </div>
        </div>
    )
}
