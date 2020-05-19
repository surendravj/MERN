import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './user/cart';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
                <AdminRoute exact path="/admin/create/category" component={AddCategory} />
                <AdminRoute exact path="/admin/create/product" component={AddProduct} />
                <AdminRoute exact path="/admin/manage/categories" component={ManageCategories} />
                <AdminRoute exact path="/admin/manage/products" component={ManageProducts} />
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
