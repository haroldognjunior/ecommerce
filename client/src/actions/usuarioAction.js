export const ADD_USER = 'ADD_USER'
export const GET_USERS = 'GET_USERS'
export const GET_USER = 'GET_USER'
export const DELETE_USER = 'DELETE_USER'
export const LOGGIN = 'LOGGIN'
export const GET_USER_LOGGED = 'GET_USER_LOGGED'
export const RESET_PASS = 'RESET_PASS'
export const RESET_PASS_USER = 'RESET_PASS_USER'
export const CONVERTIR_USUARIO = 'CONVERTIR_USUARIO'
export const GET_ORDEN_USER = 'GET_ORDEN_USER'
export const LOGOUT = 'LOGOUT'

export function addUser(usuario) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(usuario),
                credentials: 'include'

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_USER }),
                        window.history.back()
                    )
                } else {
                    alert("Error en campos")
                }
            })
    }
}

export function deleteUser(id) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/' + id, {
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
                        dispatch({ type: DELETE_USER })
                    )
                } else {
                    alert("Error en campos")
                }
            })
    }
}

export function getUsers() {
    return function(dispatch) {
        return fetch('http://localhost:3080/users', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: GET_USERS, payload: json })
            })
    }
}

export function getUserLoggedIn() {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/login', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                credentials: 'include'

            })
            .then((res) => res.json())
            .then((json) => {
                return dispatch({ type: GET_USER_LOGGED, payload: json })
            })
            .catch(() => {
                console.log("error")
            })

    }
}



export function loggin(user) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/login', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user),
                credentials: 'include'

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: LOGGIN, payload: res.json() }),
                        window.location.replace('http://localhost:3000')
                    )
                } else {
                    alert("Error en datos ingresados")
                }
            })
    }
}

export function getUser(user) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/user/' + user, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                credentials: 'include',

            })
            .then((res) => res.json())
            .then((json) => {
                return dispatch({ type: GET_USER, payload: json })
            })
            .catch(() => {
                console.log("erroasdasdr")
            })
    }
}

//Action pide al usuario que cambia la contraseña al iniciar
export function resetPass(idUser) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/user/resetpass/' + idUser, {

                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                credentials: 'include',

            })
            .then((res) => {

                return (dispatch({ type: RESET_PASS }),
                    alert("El usuario " + idUser + " debe cambiar la contraseña")

                )
            })
            .catch(() => {
                console.log("Error")
            })
    }
}

//Action que actualiza la contrasela despues de resetearla
export function resetPassUser(user) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/user/resetpass/', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(user)
            })
            .then((res) => {
                return (dispatch({ type: RESET_PASS_USER }),
                    window.location.replace('http://localhost:3000')
                )
            })
            .catch(() => {
                console.log("Error")
            })
    }
}

export function convertirUser(id) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/convertiradmin/' + id, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                credentials: 'include'

            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: CONVERTIR_USUARIO }),
                        alert('convertido a admin')
                    )
                } else {
                    alert("Error en campos")
                }
            })
    }
}

export function getOrdenUser(idUser) {
    return function(dispatch) {
        return fetch('http://localhost:3080/ordenes/' + idUser)
            .then(response => response.json())
            .then(json => {
                return dispatch({ type: GET_ORDEN_USER, payload: json })
            })
    }
}

export function logout(user) {
    return function(dispatch) {
        return fetch('http://localhost:3080/users/logout', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user),
                credentials: 'include'
            })
            .then((res) => {
                if (res.status === 200) {
                    return (
                        dispatch({ type: LOGOUT }),
                        window.location.reload()
                    )
                } else {
                    alert("Error en datos ingresados")
                }
            })
    }
}