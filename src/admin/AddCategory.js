import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { createCategory } from "../admin/helper/adminapicall";


const AddCategory = () => {
    const [name, setname] = useState("");
    const [error, setError] = useState(false);
    const [success, setsucess] = useState(false);
    const { user, token } = isAuthenticated();


    const handleChange = (event) => {
        setname(event.target.value);
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12 offset-sm-3 alert alert-warning text-center"
                    style={{ display: error ? "" : "none" }}>
                    Something went wrong unable to add category
                </div>
            </div>
        )
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12 alert offset-sm-3 alert-success text-center"
                    style={{ display: success ? "" : "none" }}>
                    Succesfully created the new category
            </div>
            </div>
        )
    };


    const onSubmit = event => {
        event.preventDefault();
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true);
                }
                else {
                    // setsucess(true);
                    setsucess(true)
                    setname("")
                }
            })
            .catch(() => {
                console.log("something went wrong in frontent part");
            })
    }

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead text-dark mb-2" style={{ fontWeight: "700" }}>Enter the category here</p>
                <input className="form-control"
                    autoFocus
                    required
                    placeholder="For Ex : Summer collection"
                    onChange={handleChange}
                    value={name}
                >
                </input>
            </div>
            <button onClick={onSubmit} className="btn btn-outline-info mb-2" style={{ fontWeight: "500" }}>
                Create category
            </button>
        </form>
    )


    const goBack = () => (
        <div className="mt-2">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                Go Back
            </Link>
        </div>
    )

    return (
        <div>
            <Base title="Create a catrgory here " description="Manage the categories from here"></Base>
            {errorMessage()}
            {successMessage()}
            <div className="Container col-md-8 col-sm-12 offset-md-2 bg-info p-4">
                <div className="row bg-white rounded">
                    <div className="col-md-8 col-sm-12 offset-md-3">
                        {categoryForm()}  {goBack()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
