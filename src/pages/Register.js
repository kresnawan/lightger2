import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(pass !== confPass) return alert("Password dan Confirm Password tidak sama!")

    // Call api
    axios({
      method: 'post',
      url: 'http://localhost:4545/api/register',
      data: {
        name: nama,
        email: email,
        password: pass
      }
    }).then(res =>{
      alert(res.data);
      return navigate('/login');
    });
  }

  return (
    <div className='container'>
      <div><h1>Register</h1></div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          
          {/* input nama */}
          <div>
            <label htmlFor="nama">Nama :</label>
            <div>
              <input type="text" id='nama' value={nama} onChange={(e) => setNama(e.target.value) } />
            </div>
          </div>

          <br />

          {/* input email */}
          <div>
            <label htmlFor="email">Email :</label>
            <div>
              <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value) } />
            </div>
          </div>

          <br />

          {/* input password */}
          <div>
            <label htmlFor="pass">Password :</label>
            <div>
              <input type="password" id='pass' value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>

          <br />

          {/* input confirm password */}
          <div>
            <label htmlFor="cpass">Confirm Password :</label>
            <div>
              <input type="password" id='cpass' value={confPass} onChange={(e) => setConfPass(e.target.value)} />
            </div>
          </div>

          <br />
          <br />

          <div>
            <input type="submit" value="Register" />
          </div>

        </form>
      </div>
      <div>
        <p>Sudah punya akun? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}
