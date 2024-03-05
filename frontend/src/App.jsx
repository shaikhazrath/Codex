import { Navigate, Route, Routes } from "react-router-dom";
import Editorx from "./main/Editor";
import Auth from "./auth/Auth";
import Home from "./main/Home";
import HomeAdmin from "./admin/HomeAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import NotFound from "./errorpages/NotFound";
import Unauth from "./errorpages/Unauth";

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const getAuthstatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:9000/user/checktoken`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAuthenticated(true);
      console.log(response.data.role)
      if (response.data.role === true) {
        setIsAdmin(true);
      }
      setLoading(false);
    } catch (error) {
      navigate("/auth");
      setLoading(false);
    }
  };
  useEffect(() => {
    getAuthstatus();
  }, [ authenticated]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
    {authenticated ? (
      <>
        {isAdmin ? (
          <>
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/" element={<Home />} />
            <Route path="/editor/:id" element={<Editorx />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:id" element={<Editorx />} />
          </>
        )}
      </>
    ) : (
      <>
        <Route path="/auth" element={<Auth />} />
        <Route path="/unauth" element={<Unauth />} />
      </>
    )}
    <Route path="*" element={<NotFound />} /> 
  </Routes>
  );
}

export default App;
