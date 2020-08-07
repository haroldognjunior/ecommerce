import React from 'react'
import { connect } from 'react-redux'
import { subCant } from '../actions/carritoAction'
import { IoIosRemoveCircle } from 'react-icons/io';


function BotonMenos({id, subCant,usuario}){
    
    function restar(){
        subCant(usuario.idUser,id)
    }

    return(
        <div className="Botones"> 
            <IoIosRemoveCircle  type="button" size={20}  onClick={restar} color="red" />
           
        </div>
    )
} 

function mapStateToProps(state){
    return{
        usuario: state.usuario.usuarioConectado 
   }
}

export default connect (mapStateToProps, {subCant})(BotonMenos)