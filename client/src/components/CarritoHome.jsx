import React, {useEffect} from 'react'
import './css/Catalogo.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCarrito, closeCart } from '../actions/carritoAction'
import { modifyCant } from '../actions/productoAction'
import BotonMas from './BotonMas'
import BotonMenos from './BotonMenos'


function CarritoHome({productosCarrito,getCarrito,usuario,modifyCant,closeCart}){

    let error = false
    
    useEffect(()=>{
        getCarrito(usuario.idUser)  
    },[getCarrito,usuario])    
    
    function comprar(){
        verificarStock()   
        if(error===true){
            return console.log("no se pudo comprar")
        }
        restarCantidades()  
        closeCart(productosCarrito[0].productoxorden.ordenIdOrden)  
        window.location.replace('http://localhost:3000/user/cart/envio/'+productosCarrito[0].productoxorden.ordenIdOrden)
    }

    function verificarStock(){
        productosCarrito.forEach(producto => {
            if (producto.cantidad< producto.productoxorden.cantidad){
                error =true 
                alert("No hay suficiente Stock de: "+producto.titulo)
            }
        });
    }

    function restarCantidades(){
        productosCarrito.forEach(producto => {
            let P = {cantidad:producto.cantidad- producto.productoxorden.cantidad, id:producto.id}
            modifyCant(P)
        });
    }

    function total(){
        let total = 0;
        productosCarrito.forEach(producto => {
            total += producto.precio * producto.productoxorden.cantidad
        })
        return <h1> Total {total}</h1>
    }

    return (

        <div className="container">
            <table className= "table table-dark" >
                <thead>
                    <tr key="0">
                    <th scope="col">Id Producto</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Sumar</th>
                    </tr>
                </thead>
                <tbody >
                    {productosCarrito.map(prod=>
                        <tr key={prod.productoxorden.productId}>
                            <td>{prod.productoxorden.productId}</td>
                            <td><img className="img-productocarrito"src={prod.imagen} alt={prod.imagen}/></td>
                            <td>
                                <Link to={'/products/producto/'+prod.id}>{prod.titulo}</Link>
                            </td>                            
                            <td>${prod.precio}</td>
                            <td>{prod.productoxorden.cantidad}</td>
                            <td>
                                <BotonMas id ={prod.productoxorden.productId} />
                                <BotonMenos id ={prod.productoxorden.productId} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {total()}
            <button className="btn btn-primary" onClick={comprar}>Comprar</button>
        </div>
    );
}


function mapStateToProps(state){
    return{
        productosCarrito : state.carrito.carrito,
        usuario: state.usuario.usuarioConectado,
   }
}

export default connect (mapStateToProps, {getCarrito,modifyCant,closeCart})(CarritoHome)