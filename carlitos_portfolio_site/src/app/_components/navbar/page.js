'use client';
import { useState, useEffect } from "react";
import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from 'next/link'

function NavBar() {
    const [homeElement, setHomeElement] = useState(null);
    const [aboutElement, setAboutElement] = useState(null);
    const [projectsElement, setProjectsElement] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        setHomeElement(document.querySelector("#home"));
        setAboutElement(document.querySelector("#about"));
        setProjectsElement(document.querySelector("#projects"));

        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 1200);
            setIsSmallScreen(width <= 518);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

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
                    <button className="nav-button">Resume</button>
                    <button className="nav-button">Demos</button>
                    <button className="nav-button contact-button">Contact</button>        
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
