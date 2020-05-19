import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(orderData)
    }).then(response => {
        return response.json();
    }).catch(() => console.log('went wrong in api call'))
}