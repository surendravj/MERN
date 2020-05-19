import React from 'react';
import { isAuthenticated } from '../auth/helper';
import StripeCheckout from "react-stripe-checkout";
import { API } from '../backend';
const Payment = ({ products, setReload = f => f, reload = undefined }) => {
    // const [values, setvalues] = useState({
    //     loading: false,
    //     success: false,
    //     error: " "
    // });

    // const { loading, success, error } = values;

    // const token = isAuthenticated() && isAuthenticated().token;
    // const userId = isAuthenticated() && isAuthenticated().user._id;

    const finalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount += p.price;
        })
        return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        return fetch(`${API}/stripepayment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(res => {
            console.log(res)
        })
            .catch(e => console.log(e))
    }

    const showButton = () => {
        return (
            isAuthenticated() ? <StripeCheckout
                stripeKey="pk_test_Dt6UszkifFRFsiYVbRW4psXT00zRUvBV4v"
                token={makePayment}
                amount={finalAmount()}
                name="But Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success btn-block">Pay Securely</button>
            </StripeCheckout>
                :
                <button className="btn btn-warning">Signin</button>
        )
    }

    return (
        <div className="text-center">
            <div className="row text-white ml-5 mb-3">
                <h3>Total Amount {finalAmount()}</h3>
                <div className="text-center btn-block">
                    {showButton()}
                </div>
            </div>
        </div>
    );
}

export default Payment;
