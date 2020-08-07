import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux'
import { addCarrito } from '../actions/carritoAction'

function AgregarChanguito({id, addCarrito,usuario}){

    function agregar(){
        addCarrito(usuario.idUser,id)
    }
    
    return(
        <div>
            <MdAddShoppingCart onClick={agregar} cursor="pointer" type="button" value="Agregar Changuito"  size={30} color="#007bff" />
        </div>
    )
    
} 

function mapStateToProps(state){
    return{
        usuario: state.usuario.usuarioConectado 
   }
}

export default connect (mapStateToProps, {addCarrito})(AgregarChanguito)