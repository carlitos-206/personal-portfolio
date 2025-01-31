/* 
    Navbar section component
*/
'use client';  // This allows to use the document.windows()
import { useState, useEffect, use } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from 'next/link'
import "./style.css";

function NavBar() {
    // UseState Components
        
        // queryselectors for nav navigation
        const [aboutElement, setAboutElement] = useState(null);
        const [projectsElement, setProjectsElement] = useState(null);
        const [experienceElement, setExperienceElement] = useState(null)
        const [contactElement, setContactElement] = useState(null)

        // mobile options for menu display
        const [menuOpen, setMenuOpen] = useState(false);
        const [isMobile, setIsMobile] = useState(false);
        const [isSmallScreen, setIsSmallScreen] = useState(false);

    // initial state handler + window resize 
    useEffect(() => {
        // query for elements
        setAboutElement(document.querySelector("#about"));
        setProjectsElement(document.querySelector("#projects"));
        setExperienceElement(document.querySelector("#experience"))
        setContactElement(document.querySelector("#contact"))

        
        // resize handler
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 1200);
            setIsSmallScreen(width <= 518);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // handles mobile menu open/close
    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    // handles nav scroll to element
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
        <nav className="nav-main">
            <div className="nav-container">
                <div className="nav-brand-container">
                    <button 
                        className="nav-button brand-button"
                    >
                        <h1 className="brand">
                        <Link href="/">                        
                            {isSmallScreen ? "Carlos Cáceres" : "Carlos R. Cáceres Martínez"}
                        </Link>
                        </h1>
                    </button>
                </div>
                {isMobile && (
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <GiHamburgerMenu />
                    </button>
                )}
                <div
                    className={`
                        nav-buttons-container 
                        ${menuOpen ? "show" : ""} 
                        ${!menuOpen && isMobile ? "align-end" : ""}
                        `}
                >
                    <button
                        className="nav-button"
                        onClick={(e) => scrollToElement(e, aboutElement)}
                    >
                        About
                    </button>
                    <button
                        className="nav-button"
                        onClick={(e) => scrollToElement(e, projectsElement)}
                    >
                        Projects
                    </button>
                    <button 
                        className="nav-button"
                        onClick={(e)=>{ scrollToElement(e, experienceElement)}}
                    >
                        Experience
                    </button>
                    <button className="nav-button">Demos</button>
                    <button 
                        className="nav-button contact-button"
                        onClick={(e)=>{ scrollToElement(e, contactElement)}}
                    >Contact</button>        
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
