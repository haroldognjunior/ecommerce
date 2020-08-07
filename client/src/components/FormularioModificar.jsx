import React ,{useEffect,useState}from 'react';
import { connect } from 'react-redux'
import {modifyProduct, getProductDetail} from '../actions/productoAction'
import { getCategories } from '../actions/categoriaAction'
 

function FormularioModificar({id, categorias, getProductDetail, modifyProduct, producto,getCategories}){
    
   
    const[categoria, setCategoria] = useState({
        nombre:"",
        accion:""
    })
    const [input, setInput] = useState({
        titulo:'',
        precio:'',
        cantidad:'',
        descripcion:'',
        imagen:'',
        categoryIdCat:''
    })
    const handleInputChange = function(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const handleCategoryChange = function(e){
        setCategoria({
            ...categoria,
            [e.target.name] : e.target.value
            
        })
    }

    const cancelar = function(){
        return window.history.back();
    }

    const enviarFormulario = function(e){
        e.preventDefault();
         modifyProduct( input,categoria, id)      
       
    }
    
    useEffect(()=>{
        getProductDetail(id)
        getCategories()
    },[id,getProductDetail,getCategories])

   return (
    <div className= "container">
        <h1>Modificar el Producto: {producto.titulo}</h1>
        <form className= "form-signin" onSubmit={(e)=> e.preventDefault}>

            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="titulo" placeholder={producto.titulo } onChange={handleInputChange}/>
            <br/>
            <label htmlFor="precio">Precio</label>
            <input type="number" name="precio" placeholder={producto.precio } onChange={handleInputChange}/>
            <br/>
            <label htmlFor="cantidad">Cantidad</label>
            <input type="number" name="cantidad" placeholder={producto.cantidad } onChange={handleInputChange}/>
            <br/>
            <label htmlFor="descripcion">Descripcion</label>
            <input type="text" name="descripcion" placeholder={producto.descripcion } onChange={handleInputChange}/>
            <br/>
            <label htmlFor="accion"> Añadir / Eliminar</label>
            <br/>
            <select required name="accion" onChange={handleCategoryChange}>
                <option value=""> Seleccionar Accion</option>
                <option value="add"> Añadir Categoria</option>
                <option value="remove"> Eliminar Categoria</option>
            </select>
            <br/>
            <label htmlFor="nombre"> Categorias</label>
            <br/>
            <select  required  name="nombre" onChange={handleCategoryChange}>
                <option name = "categoria" key ="-1" value=""> Selecciona la Categoria</option>
                {categorias.map(cat =>
                <option name = "nombre" key= {cat.idCat} value={cat.nombre} >  {cat.nombre} </option>)}
            </select>
            <br/>
            <br/>
            <button type="submit" className="btn btn-primary btn-block"  value="Enviar" onClick={enviarFormulario} >Enviar</button>
            <button type="button" className="btn-lg btn-danger btn-block"  value="Cancelar" onClick={cancelar} >Cancelar</button>
            </form>

    </div>
   )
}

function mapStateToProps(state){
    return {
        categorias :state.categoria.categorias,
        producto : state.producto.productoDetallado
    }
}

export default connect(mapStateToProps,{getProductDetail, modifyProduct,getCategories})(FormularioModificar)
