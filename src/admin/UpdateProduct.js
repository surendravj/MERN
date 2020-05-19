import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import Navbar from '../core/components/navbar';
import { isAuthenticated } from "../auth/helper/index";
import { getAllCategories, getOneProduct, updateProduct } from '../admin/helper/adminapicall';

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();
    const [values, setvalues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        loading: false,
        error: "",
        category: "",
        createdProduct: "",
        formData: ""
    });

    const { name, description, price,
        stock, photo, categories,
        loading, error,
        createdProduct,
        formData, category } = values

    const preLoadProducts = productId => {
        getOneProduct(productId)
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error })
                } else {
                    preLoadCategories();
                    setvalues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        stock: data.stock,
                        category: data.category._id,
                        price: data.price,
                        formData: new FormData()
                    })
                }
            })
            .catch(() => console.log("Something went wrong in frontend call"));
    }

    const preLoadCategories = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error })
                } else {
                    setvalues({categories: data, formData: new FormData() })

                }
            })
            .catch(() => console.log("Something went wrong in frontend call"));
    }

    useEffect(() => {
        preLoadProducts(match.params.productId);
    }, []);



    const onSubmit = event => {
        event.preventDefault();
        setvalues({ ...values, loading: true, createdProduct: "" });
        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error, loading: false })
                } else {
                    setvalues({
                        ...values, name: "",
                        description: "", stock: "",
                        price: "", error: "",
                        loading: false, photo: "",
                        createdProduct: data.name,
                    })
                }
            })
            .catch(() => console.log('something went wrong in frontend call'))
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setvalues({ ...values, [name]: value });
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                    <div className="alert alert-warning text-center"
                    >
                        Please wait we are updating the product....
                    </div>
                </div>
            )
        )
    }
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12 offset-sm-3 alert alert-warning text-center"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
            </div>
        )
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12 alert offset-sm-3 alert-success text-center"
                    style={{ display: createdProduct ? "" : "none" }}>
                    {createdProduct} succesfully updated
            </div>
            </div>
        )
    };

    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    categories&&{
                        categories.map((cate, index) => {
                            return (
                                <option key={index} value={cate._id}>
                                    {cate.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Product
          </button>
        </form>
    );



    return (
        <div>
            <Navbar />
            <Base title="Add new product" />
            <div className="Container col-md-8 col-sm-12 offset-md-2 bg-info p-4 mb-3">
                <div className="row bg-white rounded">
                    <div className="col-md-8 col-sm-12 offset-md-3">
                        {successMessage()}
                        {errorMessage()}
                        {loadingMessage()}
                        {createProductForm()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;