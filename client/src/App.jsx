import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Panggil API dari backend
    axios.get('http://localhost:5000/api')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Terjadi error saat mengambil data:', error);
      });
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat komponen dimuat

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Company Profile MERN</h1>
        <p>
          Pesan dari server: <strong>{message || 'Memuat...'}</strong>
        </p>
      </header>
    </div>
  );
}

export default App;