import React from 'react'
import { Link } from 'react-router-dom'
import './Navar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () =>{
    axios.get('http://localhost:4545/api/logout', {withCredentials: true}).then(res =>{
      alert(res.data);
      navigate('/login');
    });
  }

  return (
    <div>
        <nav>
            <Link style={{textDecoration:'none', color: 'black'}}>Lightger2</Link>
            <Link to='/'>Dashboard</Link>
            <Link to='/insert'>Insert</Link>
            <Link to='/stats'>Statistic</Link>
            <Link>
                <button onClick={handleLogout}>Logout</button>
            </Link>
        </nav>
    </div>
  )
}
