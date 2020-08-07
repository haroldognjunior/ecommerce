import React from 'react'
import { Link } from 'react-router-dom'
import { MdCreate } from 'react-icons/md';

export default function Modificar({id}){
    return(
        <Link to={'/products/modificar/'+id}>
           <MdCreate size={30} color="#007bff" />
        </Link>
    )
} 