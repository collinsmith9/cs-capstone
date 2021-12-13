import React, { useEffect, useState } from "react"
import { deleteHelpRequest, employeeCheck, getHelpRequestsWithUser, getUsersHelpRequests } from "../apiManager"
import { HelpRequestForm } from "./HelpRequestForm"
import "./HelpRequest.css"
import { EditHelpRequest } from "./EditHelpRequest"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const HelpRequest = () => {
    const [newHelpRequestExists, setNewHelpRequestExists] = useState(false)
    const [helpRequests, setHelpRequests] = useState([])
    const [userHelpRequests, setUserHelpRequests] = useState([])
    const [e, setE] = useState(false)
    const [isEmployee, setIsEmployee] = useState([])
    const history = useHistory()

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

    const syncHelpRequests = () => {
        getUsersHelpRequests(parseInt(localStorage.getItem('code_user')))
        .then(setUserHelpRequests)

        getHelpRequestsWithUser()
        .then(setHelpRequests)
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
                    return <fieldset className="helpRequest">
                       <div key={hr.id}><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p></div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncHelpRequests())
                       }}>delete help request</button></div>
                       </fieldset>
                }).reverse()
                : userHelpRequests.map((hr) => {
                    return <fieldset className="helpRequest">
                       <div key={hr.id}><h4>Posted by {hr.user.name}</h4>
                       <h5>Problem descrip: {hr.problemDescription}</h5>
                       <p>Problem: {hr.problem}</p></div><div><button onClick={() => {
                           deleteHelpRequest(hr.id)
                           .then(() => syncHelpRequests())
                       }}>Delete</button>
                       
                       <button key={"test"} onClick={() => {
                        //    setE(true)
                        //    <EditHelpRequest />
                           history.push(`helprequest/${hr.id}`) //hereee
                       }}>Edit</button>
                       
                       </div>
                       </fieldset>}).reverse()
            }
    
        
        </>
    )
}


{/* <Link to={`/helprequest/${hr.id}`}></Link> */}