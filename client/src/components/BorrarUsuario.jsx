import React  from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../actions/usuarioAction'

function BorrarUsuario({id, deleteUser}){

    function borrar(){
        deleteUser(id)
        window.location.reload()
    }

    return (
        <button type="button" className="close" aria-label="Close"
        onClick={borrar}>
            <span style={{color: "red"}} aria-hidden="true">&times;</span>
        </button>  
        )
}

export default connect  (null,{deleteUser})(BorrarUsuario)