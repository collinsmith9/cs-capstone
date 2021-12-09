import React, { useEffect, useState } from "react"
import { deletePost, existingUserCheck, getAUsersPosts, getUser } from "../apiManager"



export const UserProfile = () => {
    const [usersPosts, setUsersPosts] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        getAUsersPosts(+localStorage.getItem('code_user'))
        .then(setUsersPosts)

    },
    [])

    useEffect(() => {
        getUser(+localStorage.getItem('code_user'))
        .then(setCurrentUser)

    },
    [])

    const syncPosts = () => {
        getAUsersPosts(+localStorage.getItem('code_user'))
        .then(setUsersPosts)
    }


    return (
        <>

        <h1> {currentUser[0]?.name}'s Profile</h1>

        {
            usersPosts.map((post) => {
                return <fieldset className="post">
                <div key={post.id}><h4>Posted by {post?.user?.name}</h4>
                <h5>Problem descrip: {post?.problemDescription}</h5>
                <p>Problem: {post?.problem}</p><button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>Delete Post</button></div></fieldset>
            })
        }
        </>
        
        
    )
}