/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import ProtectedRoute from "./Components/Other/ProtectedRoute";

// common folder
import PageTitle from "./common/PageTitle/PageTitle";
import Loader from "./common/Loader/Loader";

// admin pages
import Login from "./Pages/AdminPage/Login/Login";
import Dashboard from "./Pages/AdminPage/Dashboard/Dashboard";
import User from "./Pages/AdminPage/User/User";
import Project from "./Pages/AdminPage/Project/Project";

// client page
import Home from "./Pages/ClientPage/Home/Home";
import Skill from "./Pages/AdminPage/Skill/Skill";
import DialogToast from "./Components/Other/Dialog";
import About from "./Pages/AdminPage/About/About";


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  return loading ? (
    <Loader />
  ) : (
    <>
      <DialogToast />
      <Routes>
      {/* Client Route */}
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Home" />
              <Home />
            </>
          }
        />


      {/* Admin Route */}

        {/* login route */}
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login" />
              <Login />
            </>
          }
        />

          {/* dashboard route */}
          <Route 
            path="/dashboard"
            element = {
              <ProtectedRoute>
                  <PageTitle title="Dashboard" />
                  <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/developer"
            element = {
              <ProtectedRoute>
                <PageTitle title="Developer" />
                <User />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/project"
            element= {
              <ProtectedRoute>
                <PageTitle title="Project" />
                <Project />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/skill"
            element = {
              <ProtectedRoute>
                <PageTitle title="Skill" />
                <Skill />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/about"
            element={
              <ProtectedRoute>
                <PageTitle title="About" />
                <About/>
              </ProtectedRoute>
            }
          />
      </Routes>
    </>
  );
}

export default App;
