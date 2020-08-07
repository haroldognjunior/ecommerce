import { ADD_CARRITO, GET_CARRITO, ADD_CANT, SUB_CANT, ALL_CARRITOS, ORDEN_ESPECIFICA, CLOSE_CART, ADD_ENVIO, CANCEL_ORDEN, COMPLETE_ORDEN, ALL_CARRITOS_ESTADO } from '../actions/carritoAction'
const initialState = {
    carrito: [],
    todosCarritos: []
}

export default function carrito(state = initialState, action) {
    
    switch (action.type) {
        case ADD_CARRITO:
            return {
                ...state,
                carrito: state.carrito
            }
        case GET_CARRITO:
            return {
                ...state,
                carrito: action.payload
            }
        case ADD_CANT:
            return {
                ...state,
                carrito: state.carrito
            }
        case SUB_CANT:
            return {
                ...state,
                carrito: state.carrito
            }
        case ALL_CARRITOS:
            return {
                ...state,
                todosCarritos: action.payload
            }
        case ORDEN_ESPECIFICA:
            return {
                ...state,
                carrito: action.payload
            }
        case CLOSE_CART:
            return {
                ...state,
                carrito: state.carrito
            }
        case ADD_ENVIO:
            return {
                ...state,
                carrito: state.carrito
            }
        case CANCEL_ORDEN:
            return {
                ...state,
                carrito: state.carrito
            }
        case COMPLETE_ORDEN:
            return {
                ...state,
                carrito: state.carrito
            }
        case ALL_CARRITOS_ESTADO:
            return {
                ...state,
                todosCarritos: action.payload
            }
        default:
            return state;
    }
}