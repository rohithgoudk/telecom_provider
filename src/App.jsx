import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./components/Home/Home";
import Solution from "./components/Solutions/Solution";
import Network from "./components/Network/Network";
import Company from "./components/Company/Company";
import Support from "./components/Support/Support";



import "./App.css"
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Admindashboard from "./components/Admindashboard/Admindashboard";
import NotFound from "./components/NotFound/NotFound";



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/network" element={<Network />} />
          <Route path="/company" element={<Company />} />
          <Route path="/support" element={<Support />} />
          <Route path="/solution" element={<Solution />} />
       
        </Route>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/user-dashboard" element={<Dashboard />}/>
        <Route path="/admin-dashboard" element={<Admindashboard />}/>
        





        


        <Route path="*" element={<NotFound />} /> */
      </Routes>
    </HashRouter>
  );
}

export default App;