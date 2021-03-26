import React, { useState } from 'react';
import paglogo from '../img/pag_logo.png';


import PropTypes from 'prop-types';

import * as user from '../user.json';


import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
};
   

export default function Login ({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const CheckUserName = (inputuser) => {
        if (inputuser === user.default.user.username) {
            setUserName(inputuser);
        } else setUserName();
    };

    const CheckPassword = (inputpassword) => {
        if (inputpassword === user.default.user.password) {
            setPassword(inputpassword);
        } else setPassword();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let token;
        if (username === user.default.user.username && password === user.default.user.password) {
            token = await loginUser({
            username,
            password
        });
        setToken(token);
    }        
    };

    const ImageClick = () => {
        console.log('kliknuo si na sliku')
    };

  return(
    <div className="login-page">
        <div className="logo-login-page">
            <a rel="noreferrer" href="https://www.pag.hr/" target="_blank"><img src={paglogo} alt="Grad Pag grb" title="Službena stranica grada Paga" onClick={ImageClick}/></a>
            <h3>GRAD PAG</h3>
            <p>Evidencija komunalne infrastrukture</p>
        </div>

        <form onSubmit={handleSubmit} className="login-forma">
        <label>
            <p>Korisničko ime:</p>
            <input type="text" onChange={e => CheckUserName(e.target.value)}/>
        </label>
        <label>
            <p>Lozinka: </p>
            <input type="password" onChange={e => CheckPassword(e.target.value)}/>
        </label>
        <div>
            <button type="submit" className="login-button">Prijava</button>
        </div>
        </form>
    </div>
  )
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}