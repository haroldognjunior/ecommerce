import { GET_PRODUCTS, GET_PRODUCT_DETAIL, ADD_PRODUCT, SEARCH_PRODUCT, PRODUCT_BY_CATEGORY, MODIFY_PRODUCT, REMOVE_PRODUCT, PRODUCT_REVIEW, MODIFY_CANT } from '../actions/productoAction'
const initialState = {
    productos: [],
    productoDetallado: {},
    review: []
}

export default function producto(state = initialState, action) {

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productos: action.payload
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productoDetallado: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                productos: state.productos
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                productos: action.payload
            }
        case PRODUCT_BY_CATEGORY:
            return {
                ...state,
                productos: action.payload
            }
        case MODIFY_PRODUCT:
            return {
                ...state,
                productos: state.productos
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                productos: state.productos
            }
        case PRODUCT_REVIEW:
            return {
                ...state,
                review: action.payload
            }
        case MODIFY_CANT:
            return {
                ...state,
                productos: state.productos
            }

        default:
            return state
    }

};