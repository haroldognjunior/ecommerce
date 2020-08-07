import React, {useEffect} from 'react'
import './css/Catalogo.css';
import { connect } from 'react-redux'
import { detalle } from '../actions/carritoAction'
import { Link } from 'react-router-dom'



function DetalleOrdenUsuario({productosCarrito,detalle,usuario,idOrden}){

    useEffect(()=>{
        detalle(usuario.idUser,idOrden)
    },[detalle,usuario,idOrden])        
    return (

        <div className="container">
            <table className= "table table-dark">
                <thead>
                    <tr key="0">
                    <th scope="col">Id Producto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {productosCarrito.map(prod=>
                        <tr key={prod.productoxorden.productId}>
                            <td>{prod.productoxorden.productId}</td>
                            <td><Link to={'/products/producto/'+ prod.id}>{prod.titulo}</Link></td>
                            <td>${prod.precio}</td>
                            <td>{prod.productoxorden.cantidad}</td>
                           
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


function mapStateToProps(state){
    return{
        productosCarrito : state.carrito.carrito,
        usuario: state.usuario.usuarioConectado 
   }
}

export default connect (mapStateToProps, {detalle})(DetalleOrdenUsuario)