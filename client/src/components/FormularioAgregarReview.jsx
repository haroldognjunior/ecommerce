import React, { useState } from 'react';
import { addReview } from '../actions/productoAction'
import { connect } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import Login from './Login'


function FormularioAgregarReview({addReview, id, usuarioConectado}){
  
        const [input, setInput] = useState({
        descripcion : null,
        puntaje : null
    })

    const handleInputChange = function(e){
        e.preventDefault()        
        setInput({
            ...input,
            [e.target.name]: e.target.value            
        })
       
    }
    const ratingChanged = (puntaje) => {
        setInput({
            ...input,
            puntaje: puntaje
        })
      };

    const enviarFormularioReview = function(e){
           e.preventDefault();
      addReview(input, id, usuarioConectado.idUser) ;     
    }

    const cancelar = function(e){
        window.location.replace('http://localhost:3000')  
    }

    
         
   return ( 

<div className="container">
{usuarioConectado.idUser!==0 && 
    <form className="form-signin needs-validation" data-toggle="validator" noValidate> 
            <h3>Agregar Review:</h3>

            <div className="container">
            <label htmlFor="validationTooltip01">Descripcion</label>
            <input className="form-control" required type="text" name="descripcion"  id="validationTooltip01" placeholder="Deja tu comentario sobre el producto" onChange={handleInputChange} />
         
            <ReactStars
                    count={5}
                    onChange={ratingChanged} 
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"                    
            />       
            </div>
            <br/>
            <button type="submit" className=" btn btn-lg btn-primary btn-block"  value="Enviar" onClick={enviarFormularioReview} >Enviar</button>
            <button type="submit" className=" btn btn-lg btn-danger btn-block"  value="Enviar" onClick={cancelar} >Cancelar</button>
    </form>}

    {usuarioConectado.idUser===0 && 
    <form className="form-signin needs-validation" data-toggle="validator" noValidate> 
            <h3>Haz login para dejar tu review</h3>

            
            <br/>
            <div>             
            <Login />
            <Link to={'/products/producto/'+id}>
           Lo haré en otro momento</Link>
           </div>
    </form>}

</div>
  
   )
}
function mapStateToProps(state){
  return {
      usuarioConectado : state.usuario.usuarioConectado
  }
}

export default connect(mapStateToProps,{addReview})(FormularioAgregarReview)