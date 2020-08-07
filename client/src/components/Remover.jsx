import React from 'react'
import { removeProduct } from '../actions/productoAction'
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux'


function Remover({id,removeProduct}){
   
    function quitarproducto(){
        removeProduct(id)
    window.location.reload()
    }

       return(
         <div>
           <BsTrash className="btn" type="button" value="Remover" onClick={quitarproducto} size={55} color="#007bff" />
       </div>
    )
} 

export default connect (null, {removeProduct})(Remover)
