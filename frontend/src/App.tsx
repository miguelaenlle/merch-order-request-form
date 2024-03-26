import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Seller/Dashboard/Dashboard';
import OrderManagement from './pages/Buyer/OrderManagement';
import Search from './pages/Buyer/Search';
import Login from './pages/Seller/Auth/Login';
import CreateAccount from './pages/Seller/Auth/CreateAccount';
import ForgotPassword from "./pages/Seller/Auth/ForgotPassword.tsx";
import HomePage from './pages/Buyer/HomePage';
import "./App.css";
import SampleComponentsPage from './pages/SampleComponents/SampleComponentsPage';
import SellerSpiritwearAndInventory from "./pages/Seller/Dashboard/SellerSpiritwearAndInventory.tsx";
import ConfirmEmail from "./pages/Seller/Auth/ConfirmEmail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/my-orders",
    element: <OrderManagement />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/my-account",
    element: <div>WIP</div>
  },
  {
    path: "/seller-login",
    element: <Login />
  },
  {
    path: "/seller-register",
    element: <CreateAccount />
  },
  {
    path: "/seller-dashboard",
    element: <Dashboard />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  }, 
  {
    path: "/sample-components",
    element: <SampleComponentsPage />
  },
  {
    path: "/SellerSpiritAndInv",
    element: <SellerSpiritwearAndInventory />
  },
  {
    path: "/ConfirmEmail" ,
    element: <ConfirmEmail />
  }
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
