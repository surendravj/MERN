import React, { useState, useEffect } from 'react';
import Navbar from '../core/components/navbar';
import Base from './Base';
import Card from './components/Card';
import { getAllProducts } from '../admin/helper/adminapicall';
import '../styles.css'
const Home = () => {

    const [products, setproducts] = useState([]);
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(true);

    const preLoadProducts = () => {
        getAllProducts().then(data => {
            if (data.error) {
                seterror(data.error)
            }
            else {
                setproducts(data);
                setloading(false);
            }
        })
    };


    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-6 col-sm-12 offset-sm-3 alert alert-success text-center"
                    >
                        Please wait we are loading all the wonderfull products....
                    </div>
                </div>
            )
        )
    }


    useEffect(() => {
        preLoadProducts();
    }, []);


    return (
        <div >
            <Navbar />
            <Base title="Home page" description="Welcome to Tshop" />
            <h2 className="text-center text-white">All Products</h2>
            {loading}?{loadingMessage()}:<div className=" container-fluid mb-5 row bg-dark">
                {products.map((product, index) => {
                    return (<div key={index} className="col-md-3 col-xs-12 col-sm-6 mb-3">
                        <Card product={product}/>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default Home;

