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
        <div className="employee__header"><h1 key={'employeelistwelcome'}>Employee List</h1></div>
        {
            employees.map((emp) => {
                return <fieldset key={`employee--${emp.id}`}  className="employee">
                <div><h4>{emp.name}</h4>
                <h5>Email: {emp.email}</h5>
                </div>
                </fieldset>

            })
        }
        </>
    )
}