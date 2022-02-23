

import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"



export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("code_user", res.userId)
                    localStorage.setItem("isEmployee", res.isStaff)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Coding Help</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username address </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit" onClick={handleLogin}>Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
// import React, { useRef, useState } from "react"
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom"
// import { existingUserCheck } from "../apiManager";

// export const Login = () => {
//     const [email, set] = useState("")
//     const existDialog = useRef()
//     const history = useHistory()

//     const handleLogin = (e) => {
//         e.preventDefault()
//         existingUserCheck(email)
//             .then(exists => {
//                 if (exists) {
//                     localStorage.setItem("code_user", exists.id)
//                     history.push("/")
//                 } else {
//                     existDialog.current.showModal()
//                 }
//             })
//     }

//     return (
//         <main className="container--login">
//             <dialog className="dialog dialog--auth" ref={existDialog}>
//                 <div>User does not exist</div>
//                 <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
//             </dialog>

//             <section>
//                 <form className="form--login" onSubmit={handleLogin}>
//                     <h1>Collin's Coding Help</h1>
//                     <h2>Please sign in</h2>
//                     <fieldset>
//                         <label htmlFor="inputEmail"> Email address </label>
//                         <input type="email"
//                             onChange={evt => set(evt.target.value)}
//                             className="form-control"
//                             placeholder="Email address"
//                             required autoFocus />
//                     </fieldset>
//                     <fieldset>
//                         <button type="submit">
//                             Sign in
//                         </button>
//                     </fieldset>
//                 </form>
//             </section>
//             <section className="link--register">
//                 <Link to="/register">Not a member yet?</Link>
//             </section>
//         </main>
//     )
// }

