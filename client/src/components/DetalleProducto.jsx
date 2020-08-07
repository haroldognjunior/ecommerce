import React, {useEffect} from 'react';
import imagenDefault from '../img/sinImagen.png'
import { getProductDetail} from '../actions/productoAction' 
import AgregarReview from './AgregarReview.jsx' 
import Review from './Review'
import { connect } from 'react-redux'
import './css/Producto.css'
import Modificar from './Modificar'
import Agregarchanguito from './AgregarChanguito.jsx'


function DetalleProducto({id, detalleProducto, getProductDetail, usuario}){
    
    useEffect(()=>{getProductDetail(id)},[id,getProductDetail])

    var imagen=''
    if(detalleProducto.imagen===""){
        imagen=imagenDefault
    }else{
        imagen = detalleProducto.imagen
    }
    
    function stock(){
        if (detalleProducto.cantidad ===0){
            return <h1>Stock: Sin Stock</h1>
        }
        return <h1>Stock: {detalleProducto.cantidad}</h1>
    }
    
    return(
        <div className="productodetalle">
            <img className='img-producto2' src={imagen} alt="Imagen Producto"/> 
            {usuario.admin === true &&<span className="modificar"><Modificar id={detalleProducto.id}/></span>}
            {usuario.idUser!==0 && <span className="agregarChanguito"> <Agregarchanguito id={id} /> </span>}
            <h1>Nombre: {detalleProducto.titulo}</h1>
            <h1>Precio: {detalleProducto.precio}</h1>
            {stock()}
            <h1>Descripción: {detalleProducto.descripcion}</h1> <br />
           <Review id={detalleProducto.id} /> <br /> 
            
            <div className="AgregarReview"><AgregarReview id={detalleProducto.id} /> </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        detalleProducto : state.producto.productoDetallado,
        usuario : state.usuario.usuarioConectado
    }
}

export default connect (mapStateToProps,{getProductDetail})(DetalleProducto)