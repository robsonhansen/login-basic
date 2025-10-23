"use client";
import styles from './page.module.css';

export default function HomePage() {
  const handleGetStarted = () => {
    window.location.href = '/login';
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Home Page</h1>
          <p>Welcome to the home page</p>
        </div>
        <button className={styles.button} onClick={handleGetStarted}>Get Started</button>
      </main>
    </div>
  );
}
