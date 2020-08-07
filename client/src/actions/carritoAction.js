export const ADD_CARRITO = 'ADD_CARRITO'
export const GET_CARRITO = 'GET_CARRITO'
export const ADD_CANT = 'ADD_CANT'
export const SUB_CANT = 'SUB_CANT'
export const ALL_CARRITOS = 'ALL_CARRITOS'
export const ORDEN_ESPECIFICA = 'ORDEN_ESPECIFICA'
export const CLOSE_CART = 'CLOSE_CART'
export const ADD_ENVIO = 'ADD_ENVIO'
export const CANCEL_ORDEN = 'CANCEL_ORDEN'
export const COMPLETE_ORDEN = 'COMPLETE_ORDEN'
export const ALL_CARRITOS_ESTADO = 'ALL_CARRITOS_ESTADO'


export function addCarrito(producto, usuario) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/agregaritem/' + producto + '/' + usuario, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include'
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_CARRITO }),
                        alert("producto agregado")
                    )
                } else {
                    alert("No se pudo agregar el producto")
                }
            })
    }
}

export function getCarrito(idUser) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/products/' + idUser)
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: GET_CARRITO, payload: json })
            })
    }
}

export function allCarritos() {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: ALL_CARRITOS, payload: json })
            })
    }
}

export function allCarritosEstado(estado) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/estado/' + estado, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: ALL_CARRITOS_ESTADO, payload: json })
            })
    }
}

export function addCant(idUser, idProducto) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/modificarcantidad/' + idUser + '/' + idProducto, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ accion: "sumar" })
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_CANT }),
                        window.location.reload()
                    )
                } else {
                    alert("No se pudo sumar")
                }
            })
    }
}

export function subCant(idUser, idProducto) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/modificarcantidad/' + idUser + '/' + idProducto, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({ accion: "restar" })
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: SUB_CANT }),
                        window.location.reload()
                    )
                } else {
                    alert("No se pudo restar")
                }
            })
    }
}

export function detalle(idUser, idOrden) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/products/' + idUser + '/' + idOrden + '/detalleorden')
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: ORDEN_ESPECIFICA, payload: json })
            })
    }
}

export function closeCart(idOrden) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/modificar/' + idOrden, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: CLOSE_CART }),
                        window.location.reload())
                } else {
                    alert("No se pudo restar")
                }
            })
    }
}
export function completeOrden(idOrden) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/completar/' + idOrden, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: COMPLETE_ORDEN }),
                        window.location.reload())
                } else {
                    alert("No se pudo restar")
                }
            })
    }
}
export function cancelOrden(idOrden) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/cancelar/' + idOrden, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: CANCEL_ORDEN }))
                } else {
                    alert("No se pudo restar")
                }
            })
    }
}

export function addEnvio(idOrden, envio) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/envio/' + idOrden, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(envio)
            })
            .then((res) => {
                console.log(envio)
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_ENVIO }),
                        window.location.replace('http://localhost:3000')
                    )
                }
            })
    }
}