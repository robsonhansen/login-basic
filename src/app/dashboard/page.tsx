"use client";

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const handleClick = async () => {
        const res = await fetch('/api/logout', {    
            method: 'POST',
        });

        if (res.ok) {
            router.push('/login');
        } else {
            alert('Logout failed');
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}