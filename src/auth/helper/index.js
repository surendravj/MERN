import { API } from '../../backend';

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        body: JSON.stringify(user),
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => {
        return response.json();
    }).catch(
        err => console.log(err)
    )
}

export const signin = user => {
    return fetch(`${API}/signin`, {
        body: JSON.stringify(user),
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(
            err => console.log(err)
        )
};

export const storeToken = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
    }
};


export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
}


export const isAdmin = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem('jwt')) {
        let user = JSON.parse(localStorage.getItem('jwt'));
        if (user.user.role === 1) {
            return true;
        }
        return false;
    }
}


