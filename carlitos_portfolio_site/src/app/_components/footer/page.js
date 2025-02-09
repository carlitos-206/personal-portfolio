/*
    This file holds the Footer component
*/ 
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import './layout.css';

export default function Footer(){
    // State maangers
        const [isSmallScreen, setIsSmallScreen] = useState(false);
        const [isMobile, setIsMobile] = useState(null)
        const [contactElement, setContactElement] = useState(null)
        
        
    // resize handler on render
        useEffect(() => {
            setContactElement(document.querySelector("#contact"))

            const handleResize = () => {
                const width = window.innerWidth;
                setIsSmallScreen(width <= 1300);
                setIsMobile(width <= 1300);

            };
            handleResize();
            console.log(`isSmallScreen: ${isSmallScreen}`)
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }, []);

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
    // Utility for downloading a file
        const downloadFile = (url, filename) => {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename; // forces download with a specific filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };    
    // Link send offs handler
        const footerButtonsLinks = async (e, smallScreen, route) => {
            e.preventDefault(); 
           // Handle smaller screens
            if (smallScreen) {
                switch (route) {
                    case 'linkedin':
                        window.location.href = "https://www.linkedin.com/in/carlitos206/";
                        break;
                    case 'contact-me':
                        scrollToElement(e, contactElement);
                        break;
                    case 'download-resume':
                        downloadFile('/files/resume.pdf', 'Carlos_Caceres_Resume_Engineer.pdf');
                        break;
                    case 'youtube-channel':
                        window.location.href = "https://www.youtube.com/@carloscaceres2608";
                        break;
                    case 'github-profile':
                        window.location.href = "https://github.com/carlitos-206";
                        break;
                    case 'portfolio-code':
                        window.location.href = "https://github.com/carlitos-206/personal-portfolio";
                        break;
                    default:
                        break;
                }
            } else {
             // Handle larger screens
                switch (route) {
                    case 'linkedin':
                        window.open(
                            "https://www.linkedin.com/in/carlitos206/", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break;
                    case 'contact-me':
                        scrollToElement(e, contactElement);
                        break;
                    case 'download-resume':
                        downloadFile('/files/resume.pdf', 'resume.pdf');
                        break;
                    case 'youtube-channel':
                        window.open(
                            "https://www.youtube.com/@carloscaceres2608", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break
                    case 'youtube-channel':
                        window.open(
                            "https://www.youtube.com/@carloscaceres2608", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break
                    case 'github-profile':
                        window.open(
                            "https://github.com/carlitos-206", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break
                    case 'portfolio-code':
                        window.open(
                            "https://github.com/carlitos-206/personal-portfolio", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break
                    default:
                        break;
                }
            }
        };
    return(
        <section id="footer" className='footer-section-container'>
            <div className='footer-cross-container'>
                    <Image
                        src="/images/christian_cross.svg"
                        alt="Christ is King"
                        width={25}
                        height={50}
                        className="christian-cross-images"
                    />
                    <Image
                        src="/images/orthodox_cross.svg"
                        alt="Christ is King"
                        width={50}
                        height={75}
                        className="christian-cross-images"
                    />
                    <Image
                        src="/images/christian_cross.svg"
                        alt="Christ is King"
                        width={25}
                        height={50}
                        className="christian-cross-images"
                    />
            </div>
            <div className='footer-content-container'>
                <div className='footer-content-header-container'>

                </div>
                <div className='footer-content-body-container'>
                    <div className='footer-content-items footer-content-name-container'>
                        <h1 className="brand">
                            <Link href="/">                        
                                {isSmallScreen ? "Carlos Cáceres" : "Carlos R. Cáceres Martínez"}
                            </Link>
                        </h1>
                    </div>
                    <div className='footer-content-items footer-content-social-links-container'>
                        <h3>Find me on social media</h3>
                        <div className='footer-content-social-links-content-container'>
                            <button className="contact-section-social-buttons" onClick={(e)=>{footerButtonsLinks(e, isMobile, "linkedin")}}>LinkedIn</button>
                        </div>
                    </div>
                    <div className='footer-content-items footer-content-services-container'>
                        <h3>Services I provide</h3>
                        <div className='footer-content-items-text footer-content-sevices-body-container'>
                            <h4>Front-End Developement</h4>
                            <h4>Backend Developement</h4>
                            <h4>Database Management</h4>
                            <h4>Project Management</h4>
                            <h4>DevOps & Cloud Deployment</h4>
                            <h4>Machine Learning Integration</h4>
                            <h4>Automation & Scripting</h4>
                            <h4>UI/UX Design & Prototyping</h4>
                            <h4>Tech Mentorship & Training</h4>
                            <h4>and much more!</h4>

                        </div>
                    </div>
                    <div className='footer-content-items footer-content-useful-links-container'>
                        <h3>Useful Links</h3>
                        <div className='footer-content-items-text footer-content-useful-links-body'>
                            <h4 className='footer-content-useful-links-items' onClick={(e)=>{footerButtonsLinks(e, isMobile, "contact-me")}}>Contact Me</h4>
                            <h4 className='footer-content-useful-links-items' onClick={(e)=>{footerButtonsLinks(e, isMobile, "download-resume")}}>Download Resume</h4>
                            <h4 className='footer-content-useful-links-items' onClick={(e)=>{footerButtonsLinks(e, isMobile, "youtube-channel")}}>YouTube Channel</h4>
                            <h4 className='footer-content-useful-links-items' onClick={(e)=>{footerButtonsLinks(e, isMobile, "github-profile")}}>Github Profile</h4>
                            <h4 className='footer-content-useful-links-items' onClick={(e)=>{footerButtonsLinks(e, isMobile, "portfolio-code")}}>Source code for my portfolio</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}