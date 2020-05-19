import React, { useEffect, useState } from 'react';
import ImageHolder from './ImageHolder';
import { Redirect } from "react-router-dom";
import { getItemIntoCart, removeItemFromCart } from '../helper/coreapicalls';
import { isAuthenticated } from '../../auth/helper';
const Card = ({ product, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined }) => {

    const [redirect, setredirect] = useState(false);

    const addToTheCart = () => {
        getItemIntoCart(product, () => {
            setredirect(true);
        })
    }

    const redirectPage = (redirect) => {
        if (redirect) {
            return isAuthenticated()?<Redirect to="/cart" />:<Redirect to="/signin" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={addToTheCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveToCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button >
            )
        )
    }


    return (
        <div className="card text-white bg-dark border border-info text-center">
            <div className="card-header lead">{product.name}</div>
            <div className="card-body">
                <ImageHolder product={product} />
                {redirectPage(redirect)}
                <p className="font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {product.price}</p>
                <div className="row text-center">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveToCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Card;