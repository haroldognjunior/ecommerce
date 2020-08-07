import React from 'react'
import { Link } from 'react-router-dom'
import { MdFormatListNumbered } from 'react-icons/md';

export default function BotonOrdenes(){
    
    return(
        <Link to={'/administrarOrdenes'}>
             <MdFormatListNumbered className="btn" type="button" size={60} margin= {2} color="#007bff" />
           
        </Link>
    )
}