import { useState } from "react";
import authService from '../services/AuthService'
import ILogin from "../../Interfaces/Login";
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [identityNumber, setidentityNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        var data: ILogin = {
            IdentityNumber: identityNumber,
            Password: password
        }

        authService.login(data).then((result) => {
            if (result) {
                navigate('/tasks')
                localStorage.setItem("userId", result.id);
            }
            else {
                setError("Tc kimlik no veya parola hatalı");
            }
        })
     
    };

    return (
        <div className="App">
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Tc Kimlik Numarası:</label>
                        <input
                            type="text"
                            value={identityNumber}
                            onChange={(e) => setidentityNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Giriş Yap</button>
                </form>
            </div>

        </div>

    )
}

export default Login