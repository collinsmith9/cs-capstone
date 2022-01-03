import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./Footer.css";


export const Footer = () => {



    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'auto'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      };


    return (
        <>
        <div className="footer"><button className="topButton" onClick={() => {scrollToTop()}}>scroll to top</button></div>
        </>
    )
}