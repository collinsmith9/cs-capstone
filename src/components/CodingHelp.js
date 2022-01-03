import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Register } from "./auth/Register";
import { Footer } from "./footer/Footer";




export const CodingHelp = () => {

    return (
    <>
     <Route
      render={() => {
        if (localStorage.getItem("code_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
              <Footer />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
        <Login />
    </Route>
    <Route path="/register">
        <Register />
    </Route>
        
            

    </>


    )

}