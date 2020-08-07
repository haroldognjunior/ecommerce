import { GET_CATEGORIES, ADD_CATEGORY } from '../actions/categoriaAction'
const initialState = {
    categorias: []
}

export default function categoria(state = initialState, action) {


    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categorias: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categorias: state.categorias
            }
        default:
            return state
    }
};