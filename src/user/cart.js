import React, { useEffect, useState } from 'react';
import Navbar from '../core/components/navbar';
import Base from '../core/Base';
import { loadCart } from '../core/helper/coreapicalls';
import Card from '../core/components/Card';
import Payment from './Payment';

const Cart = () => {
    const [products, setproducts] = useState([]);
    const [reload, setreload] = useState(false);

    useEffect(() => {
        setproducts(loadCart())
    }, [reload]);

    const cart = () => {
        return (
            products.map((product, index) => {
                return (
                    <div className="col-md-4 col-sm-6 col-xs-12" key={index}>
                        <Card product={product}
                            removeFromCart={true}
                            addToCart={false}
                            setReload={setreload}
                            reload={reload} />
                    </div>

                )
            })
        )
    }


    return (
        <div>
            <Navbar />
            <Base title="Your Cart" description="Everthing get ready for check it out" />
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="row mb-3">
                        {cart()}
                        </div>
                      
                    </div>

                    <div className="col-3">
                        {
                            <Payment products={products} setReload={setreload} reload={reload} />
                        }
                    </div>
                

                </div>
            </div>
        </div>
    );
}

export default Cart;
