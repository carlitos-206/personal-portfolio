import "./style.css";
import Image from "next/image";
export default function HeroLanding() {
    return (
        <section className="hero-landing">
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
                {/* <h1 className="hero-title">Software Engineer</h1> */}
                <br />
                <h1 className="hero-subtitle">JavaScript + Python</h1>
                <br />
                <p className="hero-description">Connect with me to build tailored web and mobile applications!</p>
                <button className="hero-button">Contact Me</button>
                </div>
            </div>
        </section>
    );
}