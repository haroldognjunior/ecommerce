import React from 'react'
import { Link } from 'react-router-dom'


export default function AgregarReview({id}){ 
   
  return(

        <Link to={'/products/reviews/' + id}>
            <button type="button" className="btn btn-primary"  value="Agregar Review">Agregar Review</button>
              </Link>
    )
    
} 

