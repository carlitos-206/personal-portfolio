/* 
    About section component
*/
import Image from 'next/image';
import './style.css';
export default function About() {
    return (
        <section id="about" className="about-section">
            <div className='about-title-container'>
                <h1>Hello World !</h1>
            </div>
            <div className='about-content-container'>
                <div className='about-content-left'>
                    <p>I am Carlos R. Caceres Martinez, a software engineer specializing in full-stack development and team leadership. I’ve delivered impactful projects like a responsive web platform with React.js, a cross-platform mobile app with React Native, and scalable backend systems using Python, Flask, and Google Firebase. With a passion for innovation and mentorship, I’ve led hackathon teams to success, developed AI-powered solutions, and created resources for aspiring developers. Certified in full-stack Python and JavaScript development, I bring diverse technical expertise and a commitment to excellence, growth, and making a positive impact in the tech industry.</p>
                </div>
                <div className='about-content-right'>
                    <Image
                        src="/images/amazon-profile.png"
                        alt="Picture of the author"
                        width={450}
                        height={500}
                        className="about-image"
                    />
                </div>
            </div>
        </section>
    );
}
