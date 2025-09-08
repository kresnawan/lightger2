import { useState, useEffect } from 'react'
import axios from 'axios';
import './Insert.css';
import Navbar from '../components/Navbar';
import { useAuth } from '../AuthContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Insert() {

    const { user } = useAuth();

    const [loggedIn, setIsLoggedIn] = useState(user);
    const [collect, setCollect] = useState([]);
    const now = new Date(Date.now());
    const navigate = useNavigate();

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

    useEffect(() =>{
        getToken();
    }, [getToken]);

    const [selectDate, setSelectDate]   = useState('');

    const [tipe, setTipe]               = useState('Makanan');
    const [keterangan, setKeterangan]   = useState('');
    const [deskripsi, setDeskripsi]     = useState('');
    const [nominal, setNominal]         = useState('');
    const [date, setDate]               = useState(now.toString());

    const getDate = (date) =>{
        const datt = new Date(date);
        return datt;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const now = new Date(Date.now()).toISOString();
        console.log({
            tipe: tipe,
            keterangan: keterangan,
            deskripsi: deskripsi,
            nominal: nominal,
            date: date,
            createdAt: now,
            userId: loggedIn.id
        });

        for( var i in collect ) {
            axios({
                method: 'post',
                url: 'http://localhost:4545/api/insert',
                data: {
                    nominal: collect[i].nominal,
                    tipe: collect[i].tipe,
                    keterangan: collect[i].keterangan,
                    deskripsi: collect[i].deskripsi,
                    userid: collect[i].userId,
                    date: collect[i].date,
                }
            }).then(res =>{
                alert(res.data)
            });
        }
    }

    const radioChange = (e) =>{
        setSelectDate(e.target.value);
        setDate(getDate(Date.now()).toString());
    }
    const handleAdd = () =>{
        if (keterangan === '') return alert("Keterangan wajib diisi!");
        if (nominal === 0) return alert("Nominal wajib diisi!");

        const now = new Date(Date.now());
        const obj = {
            tipe: tipe,
            keterangan: keterangan,
            deskripsi: deskripsi,
            nominal: nominal,
            date: date,
            createdAt: now,
            userId: loggedIn.id
        }

        setCollect(prev => [...prev, obj]);
        setKeterangan('');
        setDeskripsi('');
        setNominal('');
    }

      const removeItem = (indexToRemove) => {
    // Create a new array by combining slices, excluding the element at indexToRemove
    const newItems = [
      ...collect.slice(0, indexToRemove),
      ...collect.slice(indexToRemove + 1)
    ];
    setCollect(newItems); // Update the state with the new array
  };
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
            <h1>Insert pengeluaran</h1>
        </div>
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="selectinsert">Tipe barang* :</label>
                    <div>
                        <select name="" id="selectinsert" onChange={e => {setTipe(e.target.value)}}>
                            <option value="Makanan">Makanan</option>
                            <option value="Barang">Barang</option>
                            <option value="Kebutuhan Bulanan">Kebutuhan Bulanan</option>
                        </select>
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="keteranganinsert">Keterangan* :</label>
                    <div>
                        <input type="text" id='keteranganinsert' value={keterangan} onChange={e =>{ setKeterangan(e.target.value) }} />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="descinsert">Deskripsi :</label>
                    <div>
                        <input type="text" id='descinsert' value={deskripsi} onChange={e =>{ setDeskripsi(e.target.value) }} />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="nomininsert">Nominal* :</label>
                    <div>
                        <input type="number" id='nomininsert' value={nominal} onChange={e =>{ setNominal(e.target.value) }} />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="nomininsert">Date* :</label>
                    <div>
                        <input type="radio" name="ad" id="aa" value="now" onChange={radioChange} defaultChecked />
                        <label htmlFor="aa">Now</label>
                        
                        <input type="radio" name="ad" id="bb" value="spec" onChange={radioChange} />
                        <label htmlFor="bb">Define date</label>
        
                    </div>
                </div>
                <br />
                <div>
                    {
                        selectDate === 'spec' && ( <input type="date" onChange={e =>{ setDate(getDate(e.target.value).toString()) }} /> )
                    }
                </div>
                <br />
                <br />
                <div>
                    <button type='button' onClick={handleAdd}>Add</button>
                    { collect.length > 0 && <input type="submit" value='Submit' /> }
                </div>
            </form>
            <div>
                
            </div>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Keterangan</th>
                            <th>Tipe</th>
                            <th>Deskripsi</th>
                            <th>User ID</th>
                            <th>Tanggal</th>
                            <th>Nominal</th>
                            <th>Opsi</th>
                        </tr>
                    </thead>
                
                {collect.length > 0 ? (collect.map((item, index) =>(
                    <tbody key={index}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.keterangan}</td>
                            <td>{item.tipe}</td>
                            <td>{item.deskripsi}</td>
                            <td>{item.userId}</td>
                            <td>{item.date}</td>
                            <td>{item.nominal}</td>
                            <td><button onClick={() => removeItem(index) }>Hapus</button></td>
                        </tr>
                    </tbody>
                ))) : ( <tbody>
                    <tr>
                        <td colSpan="8" align='center'>Belum ada data yang diinput</td>
                    </tr>
                </tbody> )}
                </table>
            </div>
        </div>
    </div>
  )
}
