/*
    This is the main component for Demos that gets exported to the Root component
*/
import React from "react";

// Custom components
import DataCollectionProject from "./userAgent/page"; 
import BYO_GPT from "./gpt/page";
import ES_PROJECT from "./voice/page";

import "./layout.css";
export default function Demos(){
    return (
        <section id="demos" className="demo-section-container">
            <h1 className="demo-title">Live Demos</h1>
            <div className="demo-content-contianer">
                <div className="demo-content-left">
                    <DataCollectionProject />
                    <BYO_GPT />
                </div>
                <div className="demo-content-right">
                    <ES_PROJECT />
                </div>
            </div>
        </section>
    );
}
