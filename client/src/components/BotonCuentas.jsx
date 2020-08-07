import React from 'react'
import { Link } from 'react-router-dom'
import { MdPeople } from 'react-icons/md';
import './css/Botoncuentas.css';

export default function BotonCuentas(){
    return(
        <Link to={'/administrarCuentas'}>
             <MdPeople className="btn" type="button" value="Login" size={60} margin= {2} color="#007bff" />
        </Link>
    )
}