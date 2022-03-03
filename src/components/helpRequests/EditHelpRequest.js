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


    const checkEmployeeNull = () => {
        if (updatedHelpRequest.employeeId !== undefined) {
            console.log("ok")
        } else {
            const copy = {...updatedHelpRequest}
            copy.employeeId = helpRequest.employee?.id
            setUpdatedHelpRequest(copy)
        }

    }
    
    const handleEdit = (e) => {
        e.preventDefault()
        

    const editedHR = {
        employee: updatedHelpRequest.employee.id,
        problem: updatedHelpRequest.problem,
        problemDescription: updatedHelpRequest.problemDescription,
        user: updatedHelpRequest.userId
    }


    fetch(`http://localhost:8000/helprequests/${hrId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedHR)
    }).then(() => {
        history.push("/helprequest")
    })
    }

    return (
        <>

        <h1 className="edithr__header">edit help request</h1>

        <h2 className="edithr__header">Current help request</h2>
        <fieldset className="helpRequest">
        <div key={helpRequest?.id}>
        <h5>Problem descrip: {helpRequest?.problemDescription}</h5>
        <p>Problem: {helpRequest?.problem}</p></div>
        </fieldset>

        <h2 className="edithr__header">Edit fields necessary.</h2>
        
        <HelpRequestForm hrId={hrId} placeholder={helpRequest} setPlaceHolder={setHelpRequest} updatedHelpRequest={updatedHelpRequest} setUpdatedHelpRequest={setUpdatedHelpRequest} handleEdit={handleEdit} />
        
        </>
    )
}
