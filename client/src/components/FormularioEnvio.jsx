import React, { useState } from 'react';
import { addEnvio } from '../actions/carritoAction'
import { connect } from 'react-redux'

function FormularioEnvio({id,addEnvio}){

const [input, setInput] = useState({
    direccionEnvio:null
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
    console.log(input)
    console.log(id)
    addEnvio(id,input)
}

    return(
        <div className="container">
            <form className="form-signin" >
                <h3>Ingrese direccion de Envio </h3>
                <label htmlFor="direccionEnvio" className ="sr-only">Direccion*</label>
                <input className="form-control" required type="text" name="direccionEnvio" placeholder="Direccion" onChange={handleInputChange}/>         
                <button type="submit" className=" btn-lg btn-primary btn-block"  value="Enviar" onClick={enviarFormulario} >Guardar</button>

            </form>
        </div>
    )
}

export default connect(null,{addEnvio})(FormularioEnvio)