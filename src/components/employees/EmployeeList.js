import React, { useEffect, useState } from "react"
import { getEmployees } from "../apiManager"
import './EmployeeList.css'



export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
        .then(setEmployees)

    },
    [])

    return (
        <>
        <h1>Employee List</h1>
        {
            employees.map((emp) => {
                return <fieldset className="employee">
                <div key={emp.id}><h4>{emp.name}</h4>
                <h5>Email: {emp.email}</h5>
                </div>
                </fieldset>

            })
        }
        </>
    )
}