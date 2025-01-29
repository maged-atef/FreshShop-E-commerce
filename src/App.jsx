import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Prodcuts/Products";
import Profile from "./components/Profile/Profile";
import Group from "./components/Group/Group";
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import UserTokenProvider from "./components/Context/UserContext";
import Protect_Route from "./components/Protected_Route/Protect_Route";
import ProductDetails from "./components/Product_details/Product_details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let ServerState = new QueryClient();

const Router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      {
        path: "Home", element: <Protect_Route> <Home /> </Protect_Route>,
        children: [
          { path: "profile", element: <Protect_Route> <Profile /> </Protect_Route> },
          { path: "group", element: <Protect_Route> <Group /> </Protect_Route> }]
      },
      { path: "Products", element: <Protect_Route> <Products /> </Protect_Route> },
      { path: "ProductDetails/:id/:category", element: <Protect_Route> <ProductDetails /> </Protect_Route> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> }]
  }
]);
function App() {
  return (
    <>

      <UserTokenProvider>
        <QueryClientProvider client={ServerState}>
          <RouterProvider router={Router}></RouterProvider>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </UserTokenProvider>

    </>
  );
}

export default App;
