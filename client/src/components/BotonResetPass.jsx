import React  from 'react';
import { connect } from 'react-redux'
import { resetPass } from '../actions/usuarioAction'

function BorrarUsuario({id, resetPass}){

    function resetearContrasena(){
        resetPass(id)
    }

    return (
        <button type="button" className="close" aria-label="Close"
        onClick={resetearContrasena}>
            <span style={{color: "red"}} aria-hidden="true">&times;</span>
        </button>  
        )
}

export default connect  (null,{resetPass})(BorrarUsuario)