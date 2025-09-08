import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login, setUserLog } = useAuth(); // Get auth status from context

    const LoginAPI = (e) =>{
        e.preventDefault();

        try {
            axios({
                method: 'post',
                url: 'http://localhost:4545/api/login',
                data: {
                    email: email,
                    password: password
                },
                withCredentials: true
            }).then(res =>{
                alert(res.data.message);
                if (res.data.code === 1) {
                    login();
                    setUserLog(res.data.user);
                    navigate('/');
                }
                
            });
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <div>
            <h1>Login</h1>
        </div>
        <div>
            <form action="" onSubmit={LoginAPI}>
                <div>
                    <label htmlFor="email">Email :</label>
                    <div>
                        <input type="email" id='email' value={email} onChange={e => {setEmail(e.target.value)}} />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="pass">Password :</label>
                    <div>
                        <input type="password" id='pass' value={password} onChange={e => {setPassword(e.target.value)}} />
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <input type="submit" name="" id="" />
                </div>
            </form>
        </div>
        <div>
            <p>Belum punya akun? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}
