"use client";
import { useState } from 'react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Sign In</h1>
            <form>
                <label>
                    Email:
                    <input type="email" name="email" required value={email} />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" required value={username} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required value={password} />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}