import React from 'react'
import { Link } from 'react-router-dom'

export default function BotonDetalleOrden({idOrden}){
    
    return(
        <Link to={'/ordenes/detalleproductos/' + idOrden}>
            <button type="button" className="btn btn-primary" >Detalle</button>
        </Link>
    )
}