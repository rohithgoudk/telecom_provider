import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./components/Home/Home";



import "./App.css"



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          
        </Route>
       

        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/user-dashboard" element={<Dashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />



        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;