/*
    Landing section component
*/
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

import "./style.css";

export default function HeroLanding() {
    // State managers
        const [contactElement, setContactElement] = useState(null)

    // on render it finds the contact element
        useEffect(()=>{
            const contactID = document.querySelector('#contact')
            setContactElement(contactID)
        },[])
    
    // handles scrolling to elements 
        const scrollToElement = (e, element) => {
            e.preventDefault();
            console.log(element)
            if (!element) return;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 100;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setMenuOpen(false)
        };
    return (
        <section id="home" className="hero-landing">
            <div className="hero-container-top">
            <Image
                    src="/images/hero_outline.png"
                    alt=""
                    width={500}
                    height={400}
                    className="hero-image"
                    
                />
                <div className="hero-container-title">
                <h1 className="hero-title">Full-Stack Software Engineer</h1>
                <br />
                <h1 className="hero-subtitle">JavaScript + Python</h1>
                <br />
                <p className="hero-description">Connect with me to build tailored web and mobile applications!</p>
                <button 
                    className="hero-button"
                    onClick={(e)=>{scrollToElement(e, contactElement)}}
                >
                    Contact Me
                </button>
                </div>
            </div>
        </section>
    );
}