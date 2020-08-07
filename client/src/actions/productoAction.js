export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const PRODUCT_BY_CATEGORY = 'PRODUCT_BY_CATEGORY'
export const MODIFY_PRODUCT = 'MODIFY_PRODUCT'
export const MODIFY_CANT = 'MODIFY_CANT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const PRODUCT_REVIEW = 'PRODUCT_REVIEW';
export const ADD_REVIEW = 'ADD_REVIEW';


export function getProducts() {
    return function(dispatch) {
        return fetch('http://localhost:3080/products')
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_PRODUCTS, payload: json })
            })
    }
}

export function getProductDetail(id) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/' + id)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_PRODUCT_DETAIL, payload: json })
            })
    }
}
export function addProduct(producto) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/agregar', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(producto),
                credentials: 'include'

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_PRODUCT }),
                        window.location.replace('http://localhost:3000')
                    )
                } else {
                    alert("No se pudo agregar el producto")
                }
            })
    }
}

export function searchProduct(producto) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/search/' + producto)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: SEARCH_PRODUCT, payload: json })
            })
    }
}

export function productByCategory(categoria) {
    return function(dispatch) {
        return fetch('http://localhost:3080/categories/products/' + categoria)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: PRODUCT_BY_CATEGORY, payload: json })
            })

    }
}

export function modifyProduct(producto, categoria, id) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/modificar/' + id, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(producto),
                credentials: 'include'
            })
            .then((res) => {
                if (res.status === 200) {
                    //////LE AGREGA LA CATEGORIA
                    fetch('http://localhost:3080/categories/adddelete/' + id, {
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: JSON.stringify(categoria),
                        credentials: 'include'
                    }).then(res => {
                        if (res.status === 200) {
                            return (dispatch({ type: MODIFY_PRODUCT }),
                                window.location.replace('http://localhost:3000'))
                        }
                        if (res.status !== 200)
                            alert("No se Añadio/Elimino la Categoria")
                    })
                }
                if (res.status !== 200)
                    alert("No se pudo modificar el producto")
            })
    }
}


export function removeProduct(id) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/' + id, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                credentials: 'include'

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: REMOVE_PRODUCT })

                    )
                }
            })
    }
}



export function getReview(idProduct) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/reviews/products/' + idProduct)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: PRODUCT_REVIEW, payload: json })
            })
    }
}

export function modifyCant(producto) {
    return function(dispatch) {
        return fetch('http://localhost:3080/products/modificarcantidad', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(producto)

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: MODIFY_CANT })
                    )
                }
            })
    }
}

export function addReview(producto, idproduct, idusuario) {

    return function(dispatch) {
        return fetch("http://localhost:3080/products/reviews/" + idproduct + "/" + idusuario + "/", {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(producto),
                credentials: 'include'
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_REVIEW }),
                        window.history.back()
                    )
                } else {
                    alert("No se pudo agregar el review")
                }
            })
    }
}