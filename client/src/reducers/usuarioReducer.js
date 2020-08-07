import { ADD_USER, GET_USERS, LOGOUT, GET_USER, DELETE_USER, GET_USER_LOGGED, LOGGIN, RESET_PASS, RESET_PASS_USER, CONVERTIR_USUARIO, GET_ORDEN_USER } from '../actions/usuarioAction'
const initialState = {
    usuarios: [],
    usuarioConectado: {},
    ordenesUsuario: []
}

export default function usuario(state = initialState, action) {

    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                usuarios: state.usuarios
            }
        case GET_USERS:
            return {
                ...state,
                usuarios: action.payload
            }
        case GET_USER:
            return {
                ...state,
                usuarios: state.usuarios
            }
        case DELETE_USER:
            return {
                ...state,
                usuarios: state.usuarios
            }
        case LOGGIN:
            return {
                ...state,
                usuarioConectado: action.payload
            }
        case GET_USER_LOGGED:
            return {
                ...state,
                usuarioConectado: action.payload
            }
        case RESET_PASS:
            return {
                ...state,
                usuarios: state.usuarios
            }
        case CONVERTIR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios
            }
        case RESET_PASS_USER:
            return {
                ...state,
                usuarios: state.usuarios
            }

        case GET_ORDEN_USER:
            return {
                ...state,
                ordenesUsuario: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                usuarioConectado: state.usuarioConectado
            }
        default:
            return state
    }
};