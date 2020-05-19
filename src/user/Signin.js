import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import Navbar from '../core/components/navbar';
import Footer from '../core/components/footer';
import { signin, isAuthenticated,storeToken} from '../auth/helper/index';


const Signin = () => {


    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });


    const { email, password, error, loading, isRedirect } = values;


    const { user } = isAuthenticated();


    const onHandleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }


    // submit the form to the server
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    storeToken(data, () => {
                        setValues({ ...values, error: false, loading: false, isRedirect: true })
                    })
                }
            })
            .catch(() => console.log("something weent wrong "));
    };


    // functon the redirects
    const redirectThePage = () => {
        if (isRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            return <Redirect to="/user/dashboard" />
        }
    }

    // function that show loading message to the user
    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-6 col-sm-12 offset-sm-3 alert alert-warning text-center"
                    >
                        Please wait we are signing you securely....
                    </div>
                </div>
            )
        )
    }


    // function that shows error message
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

    // signin form template
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form--group">
                            <label className="text-light">Email</label>
                            <input className="form-control" value={email}
                                onChange={onHandleChange("email")} type="email"></input>
                        </div>
                        <div className="form--group">
                            <label className="text-light">Password</label>
                            <input className="form-control" value={password}
                                onChange={onHandleChange("password")}
                                type="password"></input>
                        </div>

                        <button type="submit" onClick={onSubmit} className="mt-2 btn btn-success btn-block">
                            Signin
                        </button>
                    </form>
                    {/* <p className="text-center text-white">{JSON.stringify(values)}</p> */}
                </div>
            </div>
        )
    }

    // main function eeverthing starts from here
    return (
        <div>
            <Navbar />
            <Base title="Signin Page" description="User can signin here!" />
            {loadingMessage()}
            {errorMessage()}
            {redirectThePage()}
            <div className="container">{signInForm()}</div>
            <Footer />
        </div>
    )
}



export default Signin