/* 
    This file is the Experience section builder
*/
import { useState, useEffect } from "react";
import { Experience_Data } from "./data";
import Image from "next/image";
import "./layout.css";

export default function Experience() {
    // Option state holders
    const [selectedOption, setSelectedOption] = useState(1); // 1 - General option
    const [lastSelectOption, setLastSelectedOption] = useState(1) // 1 - General option
    
    // holds the state of data
    const [data, setData] = useState(null);

    // Whenever `selectedOption` changes, find the corresponding data
    useEffect(() => {
        
        // data query
        const foundData = Experience_Data.find(item => item.id === selectedOption);
        setData(foundData);

        // sets the element to active -> changes background with css
        let element = document.querySelector(`#tab-button-${selectedOption}`)
        element.classList.add("tab-button-active")

        // this ensures the last option goes to 'inactive'
        if(selectedOption !== lastSelectOption){
            let last_element = document.querySelector(`#tab-button-${lastSelectOption}`)
            last_element.classList.remove("tab-button-active")
            setLastSelectedOption(selectedOption)
        }
    }, [selectedOption]);

    return (
        <section id="experience" className="tab-container full-height">
            <div className="tab-background">
                <h1 className="tabs-main-title">Résumé</h1>
            <div className="tabs-button-container">
                <button
                    id="tab-button-1"
                    className="tab-button"
                    onClick={() => setSelectedOption(1)}
                >
                    General
                </button>
                <button
                    id="tab-button-2"
                    className="tab-button"
                    onClick={() => setSelectedOption(2)}
                >
                    Software Engineer
                </button>
                <button
                    id="tab-button-3"
                    className="tab-button"
                    onClick={() => setSelectedOption(3)}
                >
                    Mentorship
                </button>
                <button
                    id="tab-button-4"
                    className="tab-button"
                    onClick={() => setSelectedOption(4)}
                >
                    Culinary
                </button>
                <button
                    id="tab-button-5"
                    className="tab-button"
                    onClick={() => setSelectedOption(5)}
                >
                    Warehouse (current)
                </button>
            </div>

            <div className="tab-content">
                <div className="tab-bullets">
                    {
                        // checks if data exist
                        data ? (
                            <>

                                <h1>{data.title}</h1>
                                {   
                                    // all must be true to render
                                    data.job_title 
                                    && data.job_site 
                                    && data.job_dates ? (                            
                                        <h6>{data.job_title} | {data.job_site} | {data.job_dates}</h6>)
                                    :(
                                        <>
                                        </>
                                    ) 
                                }
                                <ul>
                                    {
                                        // maps bullet points
                                        data.points.map((item, index)=>(
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (<></>) // if !data it returns an empty element
                    }
                </div>
                <div>
                    {
                        // checks if data exist
                        data ? (
                            <>
                                <Image 
                                    src={data.image} 
                                    width={350}
                                    height={450}
                                    className="image"
                                />
                            </>
                        ) : (<></>) // if !data it returns an empty element
                    }
                </div>
            </div>
            <div className="tab-content-footer">
                <button className="tab-button-footer"><a href="/files/Resume.pdf" download="Carlos_Caceres_Resume" >Download Full Resume</a></button>
            </div>
        </div>
    </section>
  );
}
