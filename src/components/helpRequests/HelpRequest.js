import React, { useEffect, useState } from "react"
import { deleteHelpRequest, employeeCheck, getHelpRequestsWithUser, getUsersHelpRequests } from "../apiManager"
import { HelpRequestForm } from "./HelpRequestForm"
import "./HelpRequest.css"



export const HelpRequest = () => {
    const [newHelpRequestExists, setNewHelpRequestExists] = useState(false)
    const [helpRequests, setHelpRequests] = useState([])
    const [userHelpRequests, setUserHelpRequests] = useState([])
    const [e, setE] = useState(false)
    const [isEmployee, setIsEmployee] = useState([])

    useEffect(() => {
        getHelpRequestsWithUser()
        .then(setHelpRequests)

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

    const syncUsersHelpRequests = () => {
        getUsersHelpRequests(parseInt(localStorage.getItem('code_user')))
        .then(setUserHelpRequests)
    }

    const syncAllHelpRequests = () => {
        getHelpRequestsWithUser()
        .then(setHelpRequests)
    }

        
    return (
        <>
        <h1>Your help requests</h1>

            <button className="newhelprequest" onClick={ () => {setNewHelpRequestExists(true)}}>new help request</button>

            {
                !!newHelpRequestExists
                ? <HelpRequestForm newHelpRequestExists={newHelpRequestExists} setNewHelpRequestExists={setNewHelpRequestExists} syncHelpRequests={syncUsersHelpRequests} />
                : ""
            }

            {
                
                !! isEmployee[0]?.partner
                ? helpRequests.map((hr) => {
                    return <fieldset className="helpRequest">
                       <div key={hr.id}><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p></div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncAllHelpRequests())
                       }}>delete help request</button></div>
                       </fieldset>
                })
                : userHelpRequests.map((hr) => {
                    return <fieldset className="helpRequest">
                       <div key={hr.id}><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p></div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncUsersHelpRequests())
                       }}>delete help request</button></div>
                       </fieldset>})
            }
    
        
        </>
    )
}