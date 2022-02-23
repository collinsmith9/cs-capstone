
import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("code_user", res.userId)
                        localStorage.setItem("isEmployee", res.isStaff)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let other gamers know a little bit about you..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit" onClick={handleRegister}>Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}


// import React, { useRef, useState } from "react"
// import { useHistory } from "react-router-dom"
// import { existingUserCheckForRegister } from "../apiManager"
// import { Link } from "react-router-dom"


// export const Register = (props) => {
//     const [customer, setCustomer] = useState({
//         name: "",
//         email: "",
//         partner: false

//     })
//     const conflictDialog = useRef()

//     const history = useHistory()

//     const handleRegister = (e) => {
//         e.preventDefault()
//         existingUserCheckForRegister(customer)
//             .then((userExists) => {
//                 if (!userExists) {
//                     fetch("http://localhost:8088/users", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(customer)
//                     })
//                         .then(res => res.json())
//                         .then(createdUser => {
//                             if (createdUser.hasOwnProperty("id")) {
//                                 localStorage.setItem("code_user", createdUser.id)
//                                 history.push("/")
//                             }
//                         })
//                 }
//                 else {
//                     conflictDialog.current.showModal()
//                 }
//             })
//     }

    
//     const updateCustomer = (evt) => {
//         const copy = {...customer}
//         copy[evt.target.id] = evt.target.value
//         setCustomer(copy)
//     }

    

//     return (
//         <main style={{ textAlign: "center" }}>
//             <dialog className="dialog dialog--password" ref={conflictDialog}>
//                 <div>Account with that email address already exists</div>
//                 <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
//             </dialog>

//             <form className="form--login" onSubmit={handleRegister}>
//                 <h1 className="h3 mb-3 font-weight-normal">Please Register for Collin's Coding Help</h1>
//                 <fieldset>
//                     <label htmlFor="name"> Full Name </label>
//                     <input onChange={updateCustomer}
//                            type="text" id="name" className="form-control"
//                            placeholder="Enter your name" required autoFocus />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="email"> Email address </label>
//                     <input onChange={updateCustomer} type="email" id="email" className="form-control" placeholder="Email address" required />
//                 </fieldset>
                
//                 <fieldset>
//                     <label htmlFor="employee"> Employee </label>
//                     <input onChange={(evt) => {
//                         const copy = {...customer}
//                         copy.partner = evt.target.checked
//                         setCustomer(copy)

//                     }} type="checkbox" id="partner" className="form-control" placeholder="Partner"  />
//                 </fieldset>
//                 <fieldset>
//                     <button type="submit"> Register </button>
//                 </fieldset>
//             </form>
//             <Link to="/login" className="hyperlink">Back to login</Link>
//         </main>
//     )
// }