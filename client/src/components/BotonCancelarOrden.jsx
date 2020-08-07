import React from 'react'
import { connect } from 'react-redux'
import { cancelOrden } from '../actions/carritoAction'

function BotonCancelarOrdenes({id, cancelOrden}){

    function cancelarOrden(){
        cancelOrden(id)
    }

    return(
        <div>
           <button onClick={cancelarOrden} className="btn btn-outline-danger">Cancelar</button>
        </div>
    )
} 

export default connect (null, {cancelOrden})(BotonCancelarOrdenes)