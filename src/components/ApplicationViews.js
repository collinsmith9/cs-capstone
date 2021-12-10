
import React from "react"
import {Feed} from "./feed/Feed"
import {Route} from 'react-router-dom'
import { UserProfile } from "./users/UserProfile"
import { HelpRequestForm } from "./helpRequests/HelpRequestForm"
import { EmployeeList } from "./employees/EmployeeList"
import { HelpRequest } from "./helpRequests/HelpRequest"
import { EditHelpRequest } from "./helpRequests/EditHelpRequest"
import { EditPost } from "./feed/EditPost"



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
            <HelpRequest />
        </Route>
        <Route exact path="/employees">
            <EmployeeList />
        </Route>
        <Route exact path="/helprequest/:hrId(\d+)">
            <EditHelpRequest />
        </Route>
        <Route exact path="/posts/:postId(\d+)">
            <EditPost />
        </Route>
        
        
        
        
        
        
        </>
    )
}