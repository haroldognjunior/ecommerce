import React ,{useState}from 'react';
import { addCategory } from '../actions/categoriaAction'
import { connect } from 'react-redux'




function FormularioCategoria({addCategory}){
    
    const [input, setInput] = useState({
        nombre: null,
        
    })

    const handleInputChange = function(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const enviarFormulario = function(e){
        addCategory(input)
    }

    const cancelar = function(){
        window.location.replace('http://localhost:3000')       
    }

   return (
    <div className="container">
        <form className="form-signin">
            <h3>Agregar Categoria</h3>
            <label htmlFor="nombre" className ="sr-only">Nombre</label>
            <input className="form-control" type="text" name="nombre" placeholder= "Categoría" onChange={handleInputChange}/>
            <br/>
            <button type="submit" className=" btn btn-lg btn-primary btn-block"  value="Enviar" onClick={enviarFormulario} >Enviar</button>
            <button type="button" className=" btn btn-lg btn-danger btn-block"  value="Cancelar" onClick={cancelar} >Cancelar</button>
            </form>
    </div>
   )
}

export default connect(null,{addCategory})(FormularioCategoria)