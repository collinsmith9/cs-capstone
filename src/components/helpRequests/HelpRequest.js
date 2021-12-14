import React, { useEffect, useState } from "react"
import { deleteHelpRequest, employeeCheck, getEmployees, getHelpRequestsWithUser, getUsersHelpRequests } from "../apiManager"
import { HelpRequestForm } from "./HelpRequestForm"
import "./HelpRequest.css"
import { useHistory } from "react-router-dom"


export const HelpRequest = () => {
    const [newHelpRequestExists, setNewHelpRequestExists] = useState(false)
    const [helpRequests, setHelpRequests] = useState([])
    const [userHelpRequests, setUserHelpRequests] = useState([])
    const [isEmployee, setIsEmployee] = useState([])
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    useEffect(() => {
        getHelpRequestsWithUser()
        .then(setHelpRequests)

    },
    [])

    useEffect(() => {
        getEmployees()
        .then(setEmployees)
    },
    [])


    useEffect(() => {
        getUsersHelpRequests(parseInt(localStorage.getItem('code_user')))
        .then(setUserHelpRequests)
        
    },
    [])

    useEffect(() => {
        employeeCheck(parseInt(localStorage.getItem('code_user')))
        .then(setIsEmployee)

    },
    [])

    const syncHelpRequests = () => {
        getUsersHelpRequests(parseInt(localStorage.getItem('code_user')))
        .then(setUserHelpRequests)

        getHelpRequestsWithUser()
        .then(setHelpRequests)
    }

    const getEmployeeObj = (id) => {
        const theEmpObjName = employees.map((employee) => {
            if (id === employee.id) {
                return employee.name
            } return false

        })

        return theEmpObjName
    }

    const handleEdit = (ev, hrId, hrObj) => {

    const editedHR = {
        employeeId: +ev,
        problem: hrObj.problem,
        problemDescription: hrObj.problemDescription,
        userId: hrObj.userId
    }


    fetch(`http://localhost:8088/helpRequests/${hrId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedHR)
    }).then( () => {syncHelpRequests()})
    }
        
    return (
        <>
        {
            
            !! isEmployee[0]?.partner 
            ? <h1>Help Requests</h1>
            : <><h1>Your Help Requests</h1><button className="newhelprequest" onClick={ () => {setNewHelpRequestExists(true)}}>new help request</button></>
            
        }

            {
                !!newHelpRequestExists
                ? <HelpRequestForm newHelpRequestExists={newHelpRequestExists} setNewHelpRequestExists={setNewHelpRequestExists} syncHelpRequests={syncHelpRequests} />
                : ""
            }

            {
                
                !! isEmployee[0]?.partner
                ? helpRequests.map((hr) => {
                    return <fieldset key={`hr--${hr.id}`} className="helpRequest">
                       <div><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p>
                       <h5>Current Employee: {getEmployeeObj(hr.employeeId)}</h5>
                       
                       </div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncHelpRequests())
                       }}>delete help request</button><select onChange={(evt) => {
                           handleEdit(evt.target.value, hr.id, hr)
                       }}><option value="0">Select an employee</option>
                       {
                           employees.map((employee) => {
                               return <option key={`employee--${employee.id}`} value={employee.id}>{employee.name}</option>
                           })
                       }
                       </select>
                       
                       </div>
                       </fieldset>
                }).reverse()
                : userHelpRequests.map((hr) => {
                    return <fieldset key={`hr--${hr.id}`} className="helpRequest">
                       <div><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p>
                       <h5>Current Employee: {getEmployeeObj(hr.employeeId)}</h5>
                       </div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncHelpRequests())
                       }}>Delete</button>
                       
                       <button onClick={() => {
                           history.push(`helprequest/${hr.id}`) 
                       }}>Edit</button>
                       
                       </div>
                       </fieldset>}).reverse()
            }
    
        
        </>
    )
}
