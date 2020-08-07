import React, { useEffect } from 'react';
import './css/Categoria.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCategories } from '../actions/categoriaAction'


function Categoria({categorias, getCategories}) {

     useEffect(()=>{getCategories()},[getCategories])

    return (
             
      <div className="Categoria">
          {categorias.map(cat =>
              <Link key={cat.id+cat.nombre} to ={'/categories/productporcategory/'+cat.nombre}>
                  <li className = "btn btn btn-primary ListaCategoria"  key={cat.id}   > {cat.nombre} </li>
              </Link> 
          )}
      </div>
    );
  }

function mapStateToProps(state){
  return{
      categorias: state.categoria.categorias
  }
}
  
export default connect(mapStateToProps, {getCategories})(Categoria)