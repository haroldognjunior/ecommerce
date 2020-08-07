import React  from 'react';
import { connect } from 'react-redux'
import { convertirUser } from '../actions/usuarioAction'

function BotonConvertirUsuario({id, convertirUser}){

    function convertir(){
        convertirUser(id)
        
    }

    return (
        <button type="button" className="close" aria-label="Close" onClick={convertir}>
            <span> 
                <svg width="1em" height="1em" color='green'viewBox="0 0 16 16" className="bi bi-asterisk" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
                </svg> 
            </span>
        </button>  
        )
}

export default connect  (null,{convertirUser})(BotonConvertirUsuario)