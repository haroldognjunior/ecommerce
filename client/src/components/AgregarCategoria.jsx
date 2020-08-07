import React from 'react'
import { Link } from 'react-router-dom'

export default function AgregarCategoria(){

    return(
        <Link to={'/categories/agregar/'}>
            <button type="button" className="btn btn-primary" value="Agregar Categoría">Agregar Categoría</button>
        </Link>
    ) 
} 