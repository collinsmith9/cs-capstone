
import React from "react"
import {Feed} from "./feed/Feed"
import {Route} from 'react-router-dom'
import { UserProfile } from "./users/UserProfile"
import { HelpRequestForm } from "./helpRequests/HelpRequestForm"
import { EmployeeList } from "./employees/EmployeeList"



export const ApplicationViews = () => {
    return (
        <>
        
        
        <Route exact path="/">
            <Feed />
        </Route>
        <Route exact path="/profile">
            <UserProfile />
        </Route>
        <Route exact path="/helprequest">
            <HelpRequestForm />
        </Route>
        <Route exact path="/employees">
            <EmployeeList />
        </Route>
        
        
        
        
        
        
        </>
    )
}