import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'

export default function Statistics() {

    const [show1, setShow1] = useState({ condition: false, txt: "Show" });
    const [show2, setShow2] = useState({ condition: false, txt: "Show" });
    const [show3, setShow3] = useState({ condition: true, txt: "Hide" });

    function switchShow(variable, func) {
        if(variable.condition === false) {
            func({
                condition: true, txt: "Hide"
            })
        } else {
            func({
                condition: false, txt: "Show"
            })
        }
    } 

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
            <h1>Statistics</h1>
        </div>
        <div>

        
            <div>
                {/* Tabel all time */}
                <div >
            <div style={{ border: '1px solid black', padding: '20px' }}>
                <button style={{marginRight: '20px'}} onClick={() => switchShow(show1, setShow1)}>{show1.txt}</button>
                <p style={{display: 'inline'}}>Pengeluaran selama ini</p>
            </div>
            {/* Table */}
            {
                show1.condition === true && (
                    <div style={{marginTop: '20px'}}>
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
                        </table>
                    </div>
                )
            }
                </div>

                {/* Tabel 3 bulan terakhir */}
                <div style={{marginTop: '20px'}}>
            <div style={{ border: '1px solid black', padding: '20px' }}>
                <button style={{marginRight: '20px'}} onClick={() => switchShow(show2, setShow2)}>{show2.txt}</button>
                <p style={{display: 'inline'}}>Pengeluaran 3 Bulan Terakhir</p>
            </div>
            {/* Table */}
            {
                show2.condition === true && (
                    <div style={{marginTop: '20px'}}>
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
                        </table>
                    </div>
                )
            }
                </div>

                {/* Tabel 1 bulan terakhir */}
                <div style={{marginTop: '20px'}}>
            <div style={{ border: '1px solid black', padding: '20px' }}>
                <button style={{marginRight: '20px'}} onClick={() => switchShow(show3, setShow3)}>{show3.txt}</button>
                <p style={{display: 'inline'}}>Pengeluaran 1 Bulan Terakhir</p>
            </div>
            {/* Table */}
            {
                show3.condition === true && (
                    <div style={{marginTop: '20px'}}>
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
                        </table>
                    </div>
                )
            }
                </div>
            </div>

            <div>
                <h2>Informasi</h2>
            </div>
        </div>
    </div>
  )
}
