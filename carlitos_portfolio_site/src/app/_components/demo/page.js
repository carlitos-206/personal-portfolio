import React from "react";
import "./layout.css";

import DataCollectionProject from "./userAgent/page"; 
// import ES_PROJECT from "./es_project";
// import BYO_GPT from "./byo_gpt";

export default function Demos(){
    return (
        <section id="demos" className="demo-section-container">
            <h1 className="demo-title">Live Demos</h1>
            <div className="demo-content-contianer">
                <div className="demo-content-left">
                    <DataCollectionProject />
                    {/* <BYO_GPT /> */}
                </div>
                <div className="demo-content-right">
                    {/* <ES_PROJECT /> */}
                </div>
            </div>
        </section>
    );
}
