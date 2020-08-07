import React from 'react'
import { connect } from 'react-redux'
import { addCant } from '../actions/carritoAction'
import { IoIosAddCircle } from 'react-icons/io';




function BotonMas({id, addCant,usuario}){

    function sumar(){
        addCant(usuario.idUser,id)
    }

    return(
        <div className="Botones">
             <IoIosAddCircle type="button" size={20}  onClick={sumar} color="green" />
                     
        </div>
    )
} 

function mapStateToProps(state){
    return{
        usuario: state.usuario.usuarioConectado 
   }
}
export default connect (mapStateToProps, {addCant})(BotonMas)