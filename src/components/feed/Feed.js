import React, { useEffect, useState } from "react"
import { deletePost, employeeCheck, getPostsWithUser } from "../apiManager"
import { PostForm } from "./PostForm"
import './Feed.css'
import { useHistory } from "react-router-dom"


export const Feed = () => {
    const [createPostExists, setcreatepost] = useState(false)
    const [posts, setPosts] = useState([])
    const [isEmployee, setIsEmployee] = useState([])
    const history = useHistory()

    
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
        <h1 key={'welcome_message'}>Welcome to Collin's Coding Help</h1>
        <button key={"create_post"} type="createPost" onClick={(evt) => {
            setcreatepost(true)
        }}>Create Post</button>
        {
            !!createPostExists
            ? <PostForm setcreatepost={setcreatepost} syncPosts={syncPosts} /> 
            : ""
        }
        {
            !! isEmployee[0]?.partner
            ? posts.map((post) => {
                return <fieldset key={`post--${post.id}`} className="post">
                <div><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p><button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>Delete Post</button>{
                    !! isItTheirPost(post)
                    ? <button onClick={() => {history.push(`/posts/${post.id}`)}}>edit</button>
                    : ""
                }</div>
                </fieldset>}).reverse()
            : posts.map((post) => {
                return <fieldset key={`post--${post.id}`}  className="post">
                <div><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p>
                { 
                !! isItTheirPost(post)
                ? <div><button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>delete post</button><button onClick={() => {history.push(`/posts/${post.id}`)}}>edit</button></div>
                : ""
                
                
                }
                </div>
                </fieldset>

            }).reverse()


        }
        </>
    )
}