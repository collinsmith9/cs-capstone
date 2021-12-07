import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/helprequest">Help Request</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("code_user")
                    }
                }>Logout</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
        </ul>
    )
}