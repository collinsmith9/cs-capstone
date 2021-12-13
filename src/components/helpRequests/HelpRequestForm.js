import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEmployees, saveEditOfHelpRequest, uploadHelpRequest } from "../apiManager"




export const HelpRequestForm = ({newHelpRequestExists, setNewHelpRequestExists, syncHelpRequests, hrId, placeholder, setPlaceHolder, updatedHelpRequest, setUpdatedHelpRequest, handleEdit}) => {
    const [userHelpRequests, setUserHelpRequests] = useState([])
    const [newHelpRequest, setNewHelpRequest] = useState({})
    const [employees, setEmployees] = useState([])
    const history = useHistory()

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
        {
            !!hrId
            ?   
                <form className="helprequestform"  >
                <fieldset>
                    <label>Problem Description</label>
                    <input onChange={(evt) => {
                            const copy = {...updatedHelpRequest}
                            copy.problemDescription = evt.target.value
                            copy.userId = +localStorage.getItem('code_user')
                            setUpdatedHelpRequest(copy)
                    }} type="text" id="problem_descrip" placeholder={placeholder.problemDescription}  required autoFocus />
                </fieldset>
                <fieldset>
                    <label>Problem</label>
                    <input onChange={(evt) => {
                        const copy = {...updatedHelpRequest}
                        copy.problem = evt.target.value
                        setUpdatedHelpRequest(copy)
                    }} type="text" id="problem_paste" placeholder={placeholder.problem}  required autoFocus />
                </fieldset>
                <fieldset>
                    <label>Select the employee you'd like</label>
                   <select onChange={(evt) => {
                       const copy = {...updatedHelpRequest}
                       copy.employeeId = parseInt(evt.target.value)
                       setUpdatedHelpRequest(copy)
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
                    <button type="cancel" key="cancel" onClick={() => { 
                        history.push("/helprequest")
                        setUpdatedHelpRequest({})
                        }}>Cancel</button>
                    <button type="submit" key="sub" onClick={handleEdit}
                        
                        // syncHelpRequests()
                        
                        > Save Changes </button>
                </fieldset>
            </form>
                
            :   
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
                
            
    
        </>
    )
}