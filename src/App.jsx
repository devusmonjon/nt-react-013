import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Layout from "@/layout/Layout";
import Auth from "./pages/auth/auth";
import Wishlist from "./pages/wishlist/wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>{" "}
      </Routes>
    </>
  );
}

export default App;
