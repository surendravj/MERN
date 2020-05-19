import React from 'react';
import Base from '../core/Base';
import Navbar from '../core/components/navbar';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom'

const AdminDashBoard = () => {

    const {
        user: { name, email }
    } = isAuthenticated();

    const leftSide = () => {
        return (
            <div className="card text-center">
                <h4 className="card-header text-center bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-item text-success">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/manage/categories" className="nav-item text-success">
                            Manage Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-item text-success">
                            Add Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/manage/products" className="nav-item text-success">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="admin/orders" className="nav-item  text-success">
                            Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const rightSide = () => {
        return (
            <div className="card mb-2 mt-5">
                <h4 className="card-header">
                    Admin Information
               </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name : </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email : </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Status : </span> Active
                    </li>
                </ul>
            </div>
        )
    }



    return (
        <div>
            <Navbar />
            <Base title="Welcome To Admin panel" description="Manage everthing from here"></Base>
            <div className="container">
                <div className="row p-2 bg-success">
                    <div className="col-md-3 col-sm-12">
                        {leftSide()}
                    </div >
                    <div className="col-md-9 col-sm-12">
                        {rightSide()}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminDashBoard;
