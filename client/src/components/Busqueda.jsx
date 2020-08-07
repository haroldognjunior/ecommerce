import React, { useState } from "react";
import { connect } from 'react-redux'
import './css/Busqueda.css'
import { searchProduct } from '../actions/productoAction'


function Busqueda ({searchProduct}){

     const [producto, setProducto] = useState("");

    return(
        <form 
            onSubmit={(e)=>{
                e.preventDefault();
                if (producto!== ""){
                    searchProduct(producto)
                }
            }}>

            <input className='busqueda'
                type='text'
                placeholder = '¿Qué estás buscando?'
                onChange ={ e=> setProducto(e.target.value)}
                value={producto}>
            </input>
            <button className='boton' type="search" name="Buscar" value="Buscar"> <span role="img" aria-label="Buscar">&#128269;</span></button>
        </form>
    )
}

export default connect(null,{searchProduct})(Busqueda)