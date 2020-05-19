import { API } from "../../backend";

// category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => { return response.json() })
        .catch(() => { console.log("something went wrong in api call") })
}

export const getAllCategories = () => {
    return fetch(`${API}/category/all/5eb8f5cc085f16204479ef9b`, {
        method: "GET"
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}


// product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}

export const getAllProducts = () => {
    return fetch(`${API}/product/all/5eb91be81144683338da086b`, {
        method: "GET"
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}

export const getOneProduct = (productId) => {
    return fetch(`${API}/product/${productId}/`, {
        method: "GET"
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}

export const updateProduct = (productId, userId, token, updatedProduct) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: updatedProduct
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}
 
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => { return response.json() })
        .catch(() => console.log("Something went wrong in backend call"))
}