export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export function getCategories() {
    return function(dispatch) {
        return fetch('http://localhost:3080/categories')
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_CATEGORIES, payload: json })
            })
    }
}

export function addCategory(categoria) {
    return function(dispatch) {
        return fetch('http://localhost:3080/categories/agregar', {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(categoria),
                credentials: 'include'

            })
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    return (
                        dispatch({ type: ADD_CATEGORY }),
                        window.location.replace('http://localhost:3000')
                    )
                } else {
                    alert("No se pudo agregar la categoria")
                }
            })
    }
}