import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Navbar from "../core/components/navbar";
import { getAllProducts, deleteProduct } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
const ManageProducts = () => {

    const { user, token } = isAuthenticated();
    const [products, setproducts] = useState([]);
    const [error, seterror] = useState(false);
    const loadProducts = () => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    seterror(true);
                }
                else {
                    setproducts(data);
                }
            })
            .catch(err => console.log("Something went wrong in frontend"));
    };

    useEffect(() => {
        loadProducts();
    }, []);


    const deleteThisProduct = (productId) => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    seterror(true);
                }
                else {
                    loadProducts();
                }
            })
            .catch(() => console.log("Something went wrong"))
    }

    return (
        <div>
            <Navbar />
            <Base title="Welcome admin" description="Manage products here" />
            <h2 className="mb-4 text-white text-center">All products:</h2>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {products.length} products</h2>
                    {products.map((product, index) => {
                        return (<div className="row text-center mb-2 " key={index}>
                            <div className="col-4">
                                <h3 className="text-white">{product.name}</h3>
                            </div>
                            <div className="col-4">
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/product/update/${product._id}`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div className="col-4">
                                <button onClick={() => { deleteThisProduct(product._id) }} className="btn btn-danger">
                                    Delete
              </button>
                            </div>
                        </div>
                        )
                    })}
                </div>


            </div>
        </div>
    );
}

export default ManageProducts;
