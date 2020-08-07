import React, {useEffect} from 'react'
import './css/Catalogo.css';
import Producto from './Producto.jsx'
import { connect } from 'react-redux'
import { getProducts } from '../actions/productoAction'

function Catalogo({productos, getProducts}){

    useEffect(()=>{getProducts()
    },[getProducts])        
    
    return (
        <div className='catalogo'>
            {productos.filter(producto => producto.cantidad > 0).map(productoFiltrado => (
                <Producto key={productoFiltrado.id+productoFiltrado.titulo}
                item={productoFiltrado} 
                />
            ))}
        </div>
    );
}

function mapStateToProps(state){
    return{
        productos: state.producto.productos
    }
}

export default connect (mapStateToProps, {getProducts})(Catalogo)