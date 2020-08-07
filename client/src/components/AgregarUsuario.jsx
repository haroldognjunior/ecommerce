import React from 'react'
import { Link } from 'react-router-dom'

export default function AgregarCategoria(){
    
    return(
        <Link to={'/user/crearUsuario'}>
            <button type="button" className="btn btn-primary" value="Crear Cuenta">Crear Cuenta</button>
        </Link>
    )
} 