



export default function DashboardPage() {
    const user = { id: "1", name: "John Doe", email: "john.doe@example.com" }; 
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}