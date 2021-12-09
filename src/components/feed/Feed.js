import React, { useEffect, useState } from "react"
import { deletePost, employeeCheck, getPostsWithUser } from "../apiManager"
import { PostForm } from "./PostForm"
import './Feed.css'


export const Feed = () => {
    const [createPostExists, setcreatepost] = useState(false)
    const [posts, setPosts] = useState([])
    const [isEmployee, setIsEmployee] = useState([])

    
    useEffect(() => {
        getPostsWithUser()
        .then(setPosts)
        
    },
    []
    )
    
    useEffect(() => {
        employeeCheck(+localStorage.getItem('code_user'))
        .then(setIsEmployee)
        
    },
    [])
    
    const syncPosts = () => {
        getPostsWithUser()
        .then(setPosts)
    }

    const isItTheirPost = (x) => {
        if (x.userId === +localStorage.getItem('code_user')) { 
            return true
        }
        return false

    }

    return (
        <>
        <h1>Welcome to Collin's Coding Help</h1>
        <button type="createPost" onClick={(evt) => {
            setcreatepost(true)
        }}>Create Post</button>
        {
            !!createPostExists
            ? <PostForm createPostExists={createPostExists} setcreatepost={setcreatepost} syncPosts={syncPosts} /> 
            : ""
        }
        {
            !! isEmployee[0]?.partner
            ? posts.map((post) => {
                return <fieldset className="post">
                <div key={post.id}><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p><button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>Delete Post</button></div>
                </fieldset>}).reverse()
            : posts.map((post) => {
                return <fieldset className="post">
                <div key={post.id}><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p>
                { 
                !! isItTheirPost(post)
                ? <button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>delete post</button>
                : ""
                
                
                }
                </div>
                </fieldset>

            }).reverse()


        }
        </>
    )
}