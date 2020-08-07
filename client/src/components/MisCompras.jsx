import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { getOrdenUser } from '../actions/usuarioAction'
import BotonDetalleOrden from './BotonDetalleOrden'

function MisCompras({ordenes , usuario, getOrdenUser}){

    useEffect(()=>{
        getOrdenUser(usuario.idUser)
    },[getOrdenUser,usuario])
    
    return(
        <div className="container">
            <table className= "table table-dark">
                <thead>
                    <tr key="0">
                    <th scope="col">Id Orden</th>
                    <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map(orden=>
                        <tr key={orden.idOrden}>
                            <td>{orden.idOrden}</td>
                            <td>{orden.estado}</td>
                            <td><BotonDetalleOrden idOrden={orden.idOrden}></BotonDetalleOrden></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

function mapStateToProps(state){
    return{
        ordenes : state.usuario.ordenesUsuario, usuario: state.usuario.usuarioConectado  }
    
}

export default connect (mapStateToProps,{getOrdenUser})(MisCompras)