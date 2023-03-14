
import {Provider} from "react-redux";
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import Login from "./components/main/Login";
import User from "./components/main/User";
import SLayout from "./components/main/Home";
import Products from "./components/main/Products";

import store from "./components/common/store";
import CreateForm from "./components/common/UserCreateForm";
import UserEditForm from "./components/common/UserEditForm";
import UserDetail from "./components/common/UserDetail";
import CreateProduct from "./components/common/ProductCreateForm";
import ProductEditForm from "./components/common/ProductEditForm";
import ProductDetail from "./components/common/ProductDetail";

import Auth from "./hoc/Auth";






function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Auth>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home' element={<SLayout/>}>
          <Route path="users" element={<User />} />
          <Route path="create-user" element={<CreateForm />} />
          <Route path="edit-user/:userId" element={<UserEditForm />} />
          <Route path="user-detail/:userId" element={<UserDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product/:productId" element={<ProductEditForm />} />
          <Route path="view-product/:productId" element={<ProductDetail />} />


        </Route>
      </Routes>
      </Auth>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
