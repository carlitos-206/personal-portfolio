/*
  This file contains the ROOT component for the app
*/
'use client' // this allows access to document.windows()

// Custom built components
import NavBar from "./_components/navbar/page";
import HeroLanding from "./_components/hero_landing/page";
import About from "./_components/about/page";
import Projects from "./_components/projects/page";
import Experience from "./_components/expirience/page";
import Demos from "./_components/demo/page";
import Contact from "./_components/contact/page";
import Footer from "./_components/footer/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <NavBar />
      <main className={styles.main}>
        <HeroLanding />
        <About />
        <Projects />
        <Experience />
        <Demos />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
