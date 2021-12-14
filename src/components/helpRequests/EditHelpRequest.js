import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { fetchEditHelpRequest } from "../apiManager"
import { HelpRequestForm } from "./HelpRequestForm"

export const EditHelpRequest = () => {
    const [helpRequest, setHelpRequest] = useState({})
    const {hrId} = useParams()
    const [updatedHelpRequest, setUpdatedHelpRequest] = useState({})
    const history = useHistory()
    

    useEffect(() => {
        
        fetchEditHelpRequest(hrId).then( (data) => {
            setHelpRequest(data)
            setUpdatedHelpRequest(data)
        }
            )

    },
    [hrId])
    
    const handleEdit = (e) => {
        e.preventDefault()

    const editedHR = {
        employeeId: updatedHelpRequest.employeeId,
        problem: updatedHelpRequest.problem,
        problemDescription: updatedHelpRequest.problemDescription,
        userId: updatedHelpRequest.userId
    }


    fetch(`http://localhost:8088/helpRequests/${hrId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedHR)
    }).then(() => {
        history.push("/helprequest")
    })
    }

    return (
        <>

        <h1>edit help request</h1>

        <h2>Current help request</h2>
        <fieldset className="helpRequest">
        <div key={helpRequest?.id}>
        <h5>Problem descrip: {helpRequest?.problemDescription}</h5>
        <p>Problem: {helpRequest?.problem}</p></div>
        </fieldset>

        <h2>Edit fields necessary.</h2>
        
        <HelpRequestForm hrId={hrId} placeholder={helpRequest} setPlaceHolder={setHelpRequest} updatedHelpRequest={updatedHelpRequest} setUpdatedHelpRequest={setUpdatedHelpRequest} handleEdit={handleEdit} />
        
        </>
    )
}
