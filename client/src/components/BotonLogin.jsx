import React from 'react'
import { Link } from 'react-router-dom'
import { MdPerson } from 'react-icons/md';
import './css/Botonlogin.css';

export default function BotonLogin(){

    return(
        <Link to={'/login'}>
            <MdPerson className="btn" type="button" value="Login" size={60} margin= {2} color="#007bff" />
        </Link>
    )
}