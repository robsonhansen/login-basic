"use client";
import styles from "./page.module.css";
import { CircleUser } from "lucide-react";
import { useState} from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'appended-header': 'login-basic'
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      console.warn('Login successful');
      // REDIRECIONAR PARA A PÁGINA PRINCIPAL
      router.push('/dashboard');
    } else {
      // LEIA A RESPOSTA DO SERVIDOR
     const errorData = await res.json();
     console.error('Login failed:', errorData);
    }
  };

  return (
    <div className={styles.page}>
      <main>
        <h1>Login Page</h1>
        <p>Welcome to the login</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <CircleUser size={70} />
          <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}