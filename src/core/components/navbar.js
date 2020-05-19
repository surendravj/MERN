import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout, isAdmin } from '../../auth/helper/index';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" };
    }
    return { color: "#ffffff" };
};
const Navbar = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link to="/" style={currentTab(history, "/")} className="nav-link">
                        Home
                            </Link>
                </li>
               {
                    isAuthenticated() && (
                        <li className="nav-item">
                            <Link to="/cart" style={currentTab(history, "/cart")} className="nav-link">
                                Cart
                            </Link>
                        </li>
                    )
                }
                {
                    !isAdmin() && isAuthenticated()&&(
                        <li className="nav-item">
                            <Link to="/user/dashboard" style={currentTab(history, "/admin/dashboard")} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    )
                }
                {
                    isAdmin() && (
                        <li className="nav-item">
                            <Link to="/admin/dashboard" style={currentTab(history, "/admin/dashboard")} className="nav-link">
                                Admin Dashboard
                            </Link>
                        </li>
                    )
                }
                {
                    !isAuthenticated() && (
                        <li className="nav-item">
                            <Link to="/signup" style={currentTab(history, "/signup")} className="nav-link">
                                Signup
                            </Link>
                        </li>
                    )
                }
                {
                    !isAuthenticated() && (
                        <li className="nav-item">
                            <Link to="/signin" style={currentTab(history, "/signin")} className="nav-link">
                                Signin
                            </Link>
                        </li>
                    )
                }
                {isAuthenticated() && (
                    <li className="nav-item" style={{ cursor: "pointer" }}>
                        <span onClick={() => signout(() => {
                            history.push('/signin')
                        })} className="nav-link text-warning">
                            Signout
                    </span>
                    </li>)}

            </ul>
        </div>
    );
}

export default withRouter(Navbar);
