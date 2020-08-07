import React from 'react'
import { connect } from 'react-redux'
import { completeOrden } from '../actions/carritoAction'

function BotonCerrarOrden({id, completeOrden}){

    function cerrarOrden(){
        completeOrden(id)
    }

    return(
        <div>
           <button onClick={cerrarOrden} className="btn btn-outline-success">Confirmar</button>
        </div>
    )
} 

export default connect (null, {completeOrden})(BotonCerrarOrden)