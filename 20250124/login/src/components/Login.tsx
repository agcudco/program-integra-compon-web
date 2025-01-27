import { useState } from "react";
import { useNavigate } from "react-router-dom"

interface Props {
    onLogin: (login: boolean) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const credentials = [
        { username: "admin", password: "admin" },
        { username: "user", password: "user" }
    ];

    const handleLogin = () => {

        const user = credentials.find(
            user => user.username === username && user.password === password);

        if (!user) {
            setError("Usuario o contraseña incorrectos");
            navigate("/login");
        } else {
            onLogin(true);
            navigate("/");
        }

    }

    return (
        <div className="login-container">
            {error && <p>{error}</p>}
            <input type="text"
                value={username}
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
                Iniciar Sesión
            </button>
        </div>
    )

}