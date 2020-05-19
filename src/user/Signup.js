import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom'
import Navbar from '../core/components/navbar';
import Footer from '../core/components/footer';
import { signup } from '../auth/helper/index';
const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    console.log('SAAVED');
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            }).catch(console.log("Error in signup"));
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
                style={{ display: success ? "" : "none" }}>
                Account was succesfully created <Link to="/signin">Login Here</Link>
            </div>
            </div>
        )
    };

    const signupForm = event => {
        return (
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form--group">
                                <label className="text-light">Name</label>
                                <input onChange={handleChange("name")} className="form-control" type="text"></input>
                            </div>
                            <div className="form--group">
                                <label className="text-light">Email</label>
                                <input onChange={handleChange("email")} className="form-control" type="email"></input>
                            </div>
                            <div className="form--group">
                                <label className="text-light">Password</label>
                                <input onChange={handleChange("password")} className="form-control" type="password"></input>
                            </div>
                            <button onClick={onSubmit} type="submit" className="btn btn-success btn-block mt-2">
                                Signup
                        </button>
                            {/* <p className="text-white">{JSON.stringify(values)}</p> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar />
            <Base title="Signup Page" description="User can signup here!" />
            {errorMessage()}
            {successMessage()}
            <div className="container">{signupForm()}</div>
            <Footer />
        </div>
    );
}
export default Signup;
