'use client'
import styles from "./page.module.css";
import NavBar from "./_components/navbar/page";
import HeroLanding from "./_components/hero_landing/page";
import About from "./_components/about/page";
import Projects from "./_components/projects/page";
import Experience from "./_components/expirience/page";
export default function Home() {
  return (
    <div className={styles.page}>
        <NavBar />
      <main className={styles.main}>
        <HeroLanding />
        <About />
        <Projects />
        <Experience />
      </main>
      {/* <footer className={styles.footer}> */}
      {/* </footer> */}
    </div>
  );
}
