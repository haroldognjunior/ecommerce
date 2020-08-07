import React from 'react'
import { Link } from 'react-router-dom'
import { MdShopTwo} from 'react-icons/md';

export default function BotonUserOrden(){
    
    return(
        <Link to={'/ordenes/user'}>
            <MdShopTwo className="user" type="button" size={30}  color="#007bf" />
            
        </Link>
    )
}