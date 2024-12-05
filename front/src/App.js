import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Components/Home";
import OtpVer from "./Components/OtpVer";
import Profile from "./Components/Profile";
import { useDispatch, useSelector } from "react-redux";
import Validate from "./middleWares/Validate";
import UpdateProfile from "./Components/UpdateProfile";
import Products from "./Components/Products";
import RegProduct from "./Components/RegProduct";
import UpdateProduct from "./Components/UpdateProduct";
import { getProducts } from "./redux/productSlice";
import axios from "axios";
import { useEffect } from "react";

function App() {

  const {isAuth} = useSelector((state)=> state?.auth ?? '')

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:4444/viewProducts',{withCredentials:true})

            if(res.data.success){
              dispatch(getProducts({products:res.data.products}))
            }else{
                toast.error((res.data.message),
                {
                 position:"top-right",
                 autoClose: 1000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
                 transition: Bounce,

               })
            }
        } catch (error) {
            toast.error((error.message),
            {
             position:"top-right",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             transition: Bounce,

           })
        }
    }
    fetchProducts()
},[])


  return (
    <Router>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Validate isAuth={isAuth}><Profile/></Validate>}/>
        <Route path="/profile/:pid" element={<Validate isAuth={isAuth}><UpdateProfile/></Validate>}/>
        <Route path="/products" element={<Products/>} />
        <Route path="/addProduct" element={<RegProduct/>}/>
        <Route path="/editProduct/:id" element={<UpdateProduct/>}/>
        </Routes>
    </Router>
  );
}

export default App;
