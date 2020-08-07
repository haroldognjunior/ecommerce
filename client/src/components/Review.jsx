import React, {useEffect} from 'react';
import { getReview} from '../actions/productoAction'
import { connect } from 'react-redux'
import './css/Producto.css'
import Rating from '@material-ui/lab/Rating';



function Review ({Review, getReview, id}){

  useEffect(()=>{getReview(id)},[getReview,id])
 
function Promedio (){
let promedio=0
Review.forEach(R => {
promedio += parseFloat(R.puntaje)

})
return Math.round(promedio/Review.length)

}
  return (
      <div className="review">
         { Review.length !== 0 && <div className="container-informacion">
           <h4>Review Promedio:</h4><h2> <Rating name="read-only" value={Promedio()}  precision={0.5} readOnly  /> {Promedio()} </h2>
            {Review.map(R =>{
              return <div className="RatingV" key={R.userIdUser+R.idReview}> <br />
                  <span>Usuario: {R.userIdUser} </span><br />
                  <span>Comentario: {R.descripcion} </span><br />
                  
                  <Rating name="read-only" value={R.puntaje} precision={0.5} readOnly  /> {/* {R.puntaje}  */}</div>})}
                  
                 
        
          </div>}
      </div> 
  )

}
function mapStateToProps(state){
  return {
      Review : state.producto.review
    
  }
}
export default connect (mapStateToProps,{getReview})(Review) 