
import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { existingUserCheckForRegister } from "../apiManager"
import { Link } from "react-router-dom"


export const Register = (props) => {
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        partner: false

    })
    const conflictDialog = useRef()

    const history = useHistory()

    // const existingUserCheck = () => {
    //     return fetch(`http://localhost:8088/customers?email=${customer.email}`)
    //         .then(res => res.json())
    //         .then(user => !!user.length)
    // }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheckForRegister(customer)
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(customer)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("code_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    // user being able to hit enter is possible due to onSubmit (keyCode 13)
    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    // since update customer gets the target.value, you'll need to write a callback funtion onchange of checkbox to setCustomer(copy)

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Collin's Coding Help</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                
                <fieldset>
                    <label htmlFor="employee"> Employee </label>
                    <input onChange={(evt) => {
                        const copy = {...customer}
                        copy.partner = evt.target.checked
                        setCustomer(copy)

                    }} type="checkbox" id="partner" className="form-control" placeholder="Partner"  />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
            <Link to="/login" className="hyperlink">Back to login</Link>
        </main>
    )
}