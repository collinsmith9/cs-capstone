import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deletePost, getAUsersPosts, getUser } from "../apiManager"
import "./UserProfile.css"



export const UserProfile = () => {
    const [usersPosts, setUsersPosts] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const history = useHistory()

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

        <div className="userprofile__header"><h1> {currentUser?.name}'s Profile</h1></div>

        {
            usersPosts.map((post) => {
                return <fieldset key={`post--${post.id}`} className="userprofile__post">
                <div><h4>Posted by {post?.user?.name}</h4>
                <h5>Problem descrip: {post?.problemDescription}</h5>
                <p>Problem: {post?.problem}</p><button  onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>Delete Post</button><button  onClick={() => {history.push(`/posts/${post.id}`)}}>edit</button></div></fieldset>
            }).reverse()
        }
        </>
        
        
    )
}