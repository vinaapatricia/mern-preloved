/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import PrivateRoute from './components/PrivateRoute';
import CreateListing from "./pages/CreateListing"
// import { axios } from "axios";
import axios from '/node_modules/.vite/deps/axios.js?v=b046a8de';


export default function App() {

axios.defaults.withCredentials = true;
const handleSubmit = async (e) => {
  e.preventDefault();
  axios.post('https://mern-preloved-api.vercel.app/api/auth/signup').then(result => console.log(result)).catch(err => console.log(err))
}
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route element={<PrivateRoute />} >
    <Route path='/profile' element={<Profile />}/>
    <Route path='/create-listing' element={<CreateListing />}/>
      </Route>  
  </Routes>
  </BrowserRouter>
  );
}
