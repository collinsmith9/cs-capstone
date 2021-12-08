import React, { useEffect, useState } from "react"
import { getEmployees, uploadHelpRequest } from "../apiManager"




export const HelpRequestForm = ({newHelpRequestExists, setNewHelpRequestExists, syncHelpRequests}) => {
    // const [newHelpRequestExists, setNewHelpRequestExists] = useState(false)
    const [userHelpRequests, setUserHelpRequests] = useState([])
    const [newHelpRequest, setNewHelpRequest] = useState({})
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
        .then(setEmployees)

    },
    [])


    const handleNewHelpRequest = (evt) => {
        evt.preventDefault()
        
        const newHelpRequestObj = {
            userId: parseInt(localStorage.getItem('code_user')),
            problem: newHelpRequest.problem,
            problemDescription: newHelpRequest.problemDescription,
            employeeId: parseInt(newHelpRequest.employeeId)
        }

        uploadHelpRequest(newHelpRequestObj)
        .then(syncHelpRequests)
        .then(setNewHelpRequestExists(false))
    }

    return (
        <>
        <h1>Help Request Form View</h1>

        {
            <form className="helprequestform" >
            <fieldset>
                <label>Describe Your Problem</label>
                <input onChange={(evt) => {
                    const copy = {...newHelpRequest}
                    copy.problemDescription = evt.target.value
                    setNewHelpRequest(copy)
                }} type="text" id="problem_descrip" placeholder="Describe Your Problem Here"  required autoFocus />
            </fieldset>
            <fieldset>
                <label>Copy and Paste your problem here</label>
                <input onChange={(evt) => {
                    const copy = {...newHelpRequest}
                    copy.problem = evt.target.value
                    setNewHelpRequest(copy)
                }} type="text" id="problem_paste" placeholder="Paste Here"  required autoFocus />
            </fieldset>
            <fieldset>
                <label>Select the employee you'd like</label>
               <select onChange={(evt) => {
                   const copy = {...newHelpRequest}
                   copy.employeeId = evt.target.value
                   setNewHelpRequest(copy)
               }}className="employeedropdown">
                   <option value="0">Select an employee</option>
                   {
                       employees.map((employee) => {
                           return <option value={employee.id}>{employee.name}</option>
                       })
                   }
               </select>
            </fieldset>
           
            
            <fieldset>
                <button type="cancel" onClick={() => {setNewHelpRequestExists(false)}}>Cancel</button>
                <button type="submit_post" onClick={handleNewHelpRequest}> Submit Post </button>
            </fieldset>
        </form>
            
        

        }

        {/* {
            userHelpRequests.map((hr) => {
                return <fieldset className="help_request">
                <div key={post.id}><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p></div>
                </fieldset>


            })

        } */}


        </>
    )
}