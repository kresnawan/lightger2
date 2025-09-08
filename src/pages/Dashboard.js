import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';
import { useAuth } from '../AuthContext';
import 'dot'

export default function Dashboard() {

    const {user} = useAuth();

    const [loggedIn, setIsLoggedIn] = useState(user);
    const [load, setLoad] = useState(true)
    const [outcome, setOutcome] = useState([]);
    const navigate = useNavigate();

    const removeItem = (indexToRemove) => {
    // Create a new array by combining slices, excluding the element at indexToRemove
    const newItems = [
      ...outcome.slice(0, indexToRemove),
      ...outcome.slice(indexToRemove + 1)
    ];
    setOutcome(newItems); // Update the state with the new array
  };

    const deleteOut = (id, index) => {
        try {
            axios({
                method: 'get',
                url: `http://localhost:4545/api/deletep/${id}`,
                withCredentials: true
            }).then(res =>{

                alert(res.data);
                removeItem(index);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getToken = useCallback(() =>{
        try {
            axios({
                method: 'get',
                url: 'http://localhost:4545/api/token',
                withCredentials: true
            }).then(res =>{
            if (!res.data[0]) return navigate('/login');

            setIsLoggedIn(res.data[0]);
            });
        } catch (error) {
            console.log(error);
        }
    }, [navigate]);

    const getPengeluaran = useCallback(() =>{
        try {
            axios.get('http://localhost:4545/api/pengeluaran', { withCredentials: true }).then(res =>{
                setOutcome(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() =>{
        getToken();
        getPengeluaran();
        setLoad(false)
    }, [getToken, getPengeluaran]);

    
  return (
    <div className='container'>
        <div>
            <Navbar />
        </div>
        <div>
            <h1>Dashboard</h1>
            <h2>Terlogin sebagai : {loggedIn.name}</h2>
            <p>{loggedIn.email}</p>
        </div>
        <div>
            <Link to='/insert'><button>Insert data</button></Link>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tipe</th>
                        <th>Keterangan</th>
                        <th>Deskripsi</th>
                        <th>Tanggal</th>
                        <th>Input</th>
                        <th>Nominal</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                {
                    load === false && outcome.length > 0 && outcome.map((item, index) =>(
                        <tbody key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.tipe}</td>
                                <td>{item.keterangan}</td>
                                <td>{item.deskripsi}</td>
                                <td>{item.date}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.nominal}</td>
                                <td><button onClick={() => deleteOut(item.id, index)}>Delete</button></td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    </div>
  )

}
