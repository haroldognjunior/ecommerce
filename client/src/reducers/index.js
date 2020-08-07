import { combineReducers } from 'redux'
import categoria from './categoriaReducer'
import producto from './productoReducer'
import carrito from './carritoReducer'
import usuario from './usuarioReducer'
export default combineReducers({
    categoria,
    producto,
    carrito,
    usuario
})