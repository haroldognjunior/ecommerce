import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Catalogo from './Catalogo'
import { productByCategory } from '../actions/productoAction'

function ProductosPorCategoria({nombre, categorias,  productByCategory, productos}){
    
    useEffect(()=>{
        
        categorias.forEach(c=>{
            if(c.nombre === nombre){
                productByCategory(c.idCat)
            }      
        })    
    },[nombre,categorias,productByCategory])
        
    return(
        <div>
            <Catalogo productos={productos}/>
        </div>
    )
}

function mapStateToProps(state){
    return {
        categorias : state.categoria.categorias,
        productos : state.producto.productos
    }
}

export default connect(mapStateToProps,{productByCategory})(ProductosPorCategoria)