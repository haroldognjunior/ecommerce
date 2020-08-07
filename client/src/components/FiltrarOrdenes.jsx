import React  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function FiltrarOrdenes({ordenes}){

    const estados = ['Completa','Procesando','Cancelada']
        
    return(
        <div> 
            <Link key={'Completas'} to ={'/administrarOrdenes/'}>
                  <li className = "btn btn btn-primary ListaCategoria"> Todas </li>
              </Link> 
            {estados.map(el =>
              <Link key={el} to ={'/administrarOrdenes/estado/'+el}>
                  <li className = "btn btn btn-primary ListaCategoria"  key={el}   > {el} </li>
              </Link> 
          )}
        </div>
    )
}


export default connect(null,{})(FiltrarOrdenes)