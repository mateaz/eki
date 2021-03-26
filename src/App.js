import React from 'react';
import MapLeaflet from './Komponente/MapLeaflet';
import Login from './Komponente/Login';
import useToken from './Komponente/useToken';



import './App.css';

export default function App() {
  const { token, setToken } = useToken();

  
  if(!token) {
    return <Login setToken={setToken} /> //conditional statement to display Login if the token is falsy.
  };


  return (
      <div className="huha">
        <MapLeaflet /> 
      </div>
    )
}