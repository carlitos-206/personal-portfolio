'use client';
import "./style.css";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";


function NavBar() {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 1200);
            setIsSmallScreen(width <= 518);
        };
        
        // Initial check
        handleResize();
        
        if (typeof window !== undefined){
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    
        const toggleMenu = () => {
            setMenuOpen((prevState) => !prevState);
        };
        
    return (
        <nav className="nav-main">
            <div className="nav-container">
                <div className="nav-brand-container">
                    <button className="nav-button brand-button">
                        <h1 className="brand">
                            {isSmallScreen ? "Carlos Cáceres" : "Carlos R. Cáceres Martínez"}
                        </h1>
                    </button>
                </div>
                {isMobile && (
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <GiHamburgerMenu />
                    </button>
                )}
                <div
                    className={`nav-buttons-container ${
                        menuOpen ? 'show' : ''
                    } ${!menuOpen && isMobile ? 'align-end' : ''}`}
                >
                    <button className="nav-button">About</button>
                    <button className="nav-button">Projects</button>
                    <button className="nav-button">Resume</button>
                    <button className="nav-button">Demos</button>
                    <button className="nav-button contact-button">Contact</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;