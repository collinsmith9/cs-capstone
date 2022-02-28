import React, { useEffect, useState } from "react"
import { getUsers } from "../apiManager"
// import { getEmployees } from "../apiManager"
import './EmployeeList.css'



export const EmployeeList = () => {
    const [users, setUsers] = useState([])
    // const [employees, setEmployees] = useState([])

    useEffect(() => {
        getUsers()
        .then(setUsers)

    },
    [])

    const employees = users.filter((user) => {
        if (user.user.is_staff === true) {
            return true
        }
        return false
    })

    return (
        <>
        <div className="employee__header"><h1 key={'employeelistwelcome'}>Employee List</h1></div>
        {
            employees.map((emp) => {
                return <fieldset key={`employee--${emp.id}`}  className="employee">
                <div><h4>{emp.user.first_name}</h4>
                <h5>Email: {emp.user.email}</h5>
                </div>
                </fieldset>

            })
        }
        </>
    )
}