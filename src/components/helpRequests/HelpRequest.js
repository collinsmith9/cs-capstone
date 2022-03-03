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

    // useEffect(() => {
    //     employeeCheck(parseInt(localStorage.getItem('code_user')))
    //     .then(setIsEmployee)

    // },
    // [])

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
            
            !! JSON.parse(localStorage.getItem('isEmployee')) === true
            ? <div className="hr__header"><h1>Help Requests</h1></div>
            : <div className="hr__header"><h1 className="newHR__button">Your Help Requests</h1></div>
            
        }

        {
            !! JSON.parse(localStorage.getItem('isEmployee')) === true
            ? ""
            : <div className="newhr__button"><button onClick={ () => {setNewHelpRequestExists(true)}}>new help request</button></div>
        }

            {
                !!newHelpRequestExists
                ? <HelpRequestForm newHelpRequestExists={newHelpRequestExists} setNewHelpRequestExists={setNewHelpRequestExists} syncHelpRequests={syncHelpRequests} />
                : ""
            }

            {
                
                !! JSON.parse(localStorage.getItem('isEmployee')) === true
                ? helpRequests.map((hr) => {
                    return <fieldset key={`hr--${hr.id}`} className="helpRequest">
                       <div><h4>Posted by {hr.user.user.first_name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p>
                       <h5>Current Employee: {hr.employee.user.first_name}</h5>
                       
                       </div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncHelpRequests())
                       }}>delete help request</button><select id="hxr" onChange={(evt) => {
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
                       <div><h4>Posted by {hr.user.user.first_name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p>
                       <h5>Current Employee: {hr.employee.user.first_name}</h5>
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
