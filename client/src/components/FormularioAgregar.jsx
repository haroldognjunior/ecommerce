import React, { useState } from 'react';
import { addProduct } from '../actions/productoAction'

import { connect } from 'react-redux'

function FormularioAgregar({addProduct}){

    const [input, setInput] = useState({
        titulo : null,
        precio : null,
        cantidad : null,
        descripcion : '',
        imagen : '',
    })

    const handleInputChange = function(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const enviarFormulario = function(e){
        e.preventDefault();
        addProduct(input) 
    }

    const cancelar = function(e){
        window.history.back(); 
    }
         
   return (
    <div className="container">
        <form className="form-signin" data-toggle="validator" >
            <h3>Agregar nuevo producto: </h3>
            <label className ="sr-only" htmlFor="nombre">Nombre*</label>
            <input className="form-control" required type="text" name="titulo" placeholder="Nombre" onChange={handleInputChange}/>
            
            <label className ="sr-only" htmlFor="precio">Precio*</label>
            <input className="form-control" required type='number' name="precio" placeholder="Precio" onChange={handleInputChange} />
            
            <label className ="sr-only" htmlFor="cantidad">Cantidad*</label>
            <input className="form-control" required type="number" name="cantidad" placeholder="Cantidad" onChange={handleInputChange} />
            
            <label className ="sr-only" htmlFor="descripcion">Descripcion</label>
            <input className="form-control" required type="text" name="descripcion" placeholder="Descripcion" onChange={handleInputChange} />

            <label className ="sr-only" htmlFor="imagen">imagen</label>
            <input className="form-control" type="file" name="imagen" onChange={handleInputChange}/>
            <br/>
            
            <button type="submit" className=" btn btn-lg btn-primary btn-block"  value="Enviar" onClick={enviarFormulario} >Enviar</button>
            <button type="submit" className=" btn btn-lg btn-danger btn-block"  value="Enviar" onClick={cancelar} >Cancelar</button>
        </form>
    </div>
   )
}

export default connect(null,{addProduct})(FormularioAgregar)