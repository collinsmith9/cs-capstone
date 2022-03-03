import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEmployees, getUsers, uploadHelpRequest } from "../apiManager"




export const HelpRequestForm = ({newHelpRequestExists, setNewHelpRequestExists, syncHelpRequests, hrId, placeholder, setPlaceHolder, updatedHelpRequest, setUpdatedHelpRequest, handleEdit}) => {
    const [newHelpRequest, setNewHelpRequest] = useState({})
    const [users, setUsers] = useState([])
    const history = useHistory()

    useEffect(() => {
        getUsers()
        .then(setUsers)

    },
    [])

    const employees = users.filter((user) => {
        if (user?.user?.is_staff === true) {
            return true
        }
        return false
    })
    console.log(employees)


    const handleNewHelpRequest = (evt) => {
        evt.preventDefault()
        
        const newHelpRequestObj = {
            user: parseInt(localStorage.getItem('code_user')),
            problem: newHelpRequest.problem,
            problemDescription: newHelpRequest.problemDescription,
            employee: parseInt(newHelpRequest.employeeId)
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
                <div key={`divforform`} className="hr__form">
                <div>
                    <label>Problem Description</label>
                    <input onChange={(evt) => {
                            const copy = {...updatedHelpRequest}
                            copy.problemDescription = evt.target.value
                            copy.userId = +localStorage.getItem('code_user')
                            setUpdatedHelpRequest(copy)
                    }} type="text" id="problem_descrip" placeholder={placeholder.problemDescription}  required autoFocus />
                </div>
                <div>
                    <label>Problem</label>
                    <input onChange={(evt) => {
                        const copy = {...updatedHelpRequest}
                        copy.problem = evt.target.value
                        copy.userId = +localStorage.getItem('code_user')
                        setUpdatedHelpRequest(copy)
                    }} type="text" id="problem_paste" placeholder={placeholder.problem}  required autoFocus />
                </div>
                <div>
                    <label>Select the employee you'd like</label>
                   <select onChange={(evt) => {
                       const copy = {...updatedHelpRequest}
                       copy.employee.id = parseInt(evt.target.value)
                       setUpdatedHelpRequest(copy)
                   }}className="employeedropdown">
                       <option value="0">Select an employee</option>
                       {
                           employees.map((employee) => {
                               return <option key={`employee--${employee.id}`} value={employee.id}>{employee.user?.first_name}</option>
                           })
                       }
                   </select>
                </div>
               
                
                <div>
                    <button type="cancel" key="cancel" onClick={() => { 
                        history.push("/helprequest")
                        setUpdatedHelpRequest({})
                        }}>Cancel</button>
                    <button type="submit" key="sub" onClick={handleEdit}
                        > Save Changes </button>
                </div>
            </div>
                
            :   
                <div key={`divforform2`} className="hr__form">
                <div>
                    <label>Describe Your Problem</label>
                    <input onChange={(evt) => {
                        const copy = {...newHelpRequest}
                        copy.problemDescription = evt.target.value
                        setNewHelpRequest(copy)
                    }} type="text" id="problem_descrip" placeholder="Describe Your Problem Here"  required autoFocus />
                </div>
                <div>
                    <label>Copy and Paste your problem here</label>
                    <input onChange={(evt) => {
                        const copy = {...newHelpRequest}
                        copy.problem = evt.target.value
                        setNewHelpRequest(copy)
                    }} type="text" id="problem_paste" placeholder="Paste Here"  required autoFocus />
                </div>
                <div>
                    <label>Select the employee you'd like</label>
                   <select onChange={(evt) => {
                       const copy = {...newHelpRequest}
                       copy.employeeId = evt.target.value
                       setNewHelpRequest(copy)
                   }}className="employeedropdown">
                       <option value="0">Select an employee</option>
                       {
                           employees.map((employee) => {
                               return <option key={`employeee--${employee.id}`} value={employee.id}>{employee.user.first_name}</option>
                           })
                       }
                   </select>
                </div>
               
                
                <div>
                    <button type="cancel" onClick={() => {setNewHelpRequestExists(false)}}>Cancel</button>
                    <button type="submit_post" onClick={handleNewHelpRequest}> Submit Post </button>
                </div>
            </div>

        }
                
            
    
        </>
    )
}