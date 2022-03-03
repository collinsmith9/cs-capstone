import React, { useEffect, useState } from "react"
import { deletePost, employeeCheck, getPosts, getPostsWithUser } from "../apiManager"
import { PostForm } from "./PostForm"
import './Feed.css'
import { useHistory } from "react-router-dom"


export const Feed = () => {
    const [createPostExists, setcreatepost] = useState(false)
    const [posts, setPosts] = useState([])
    const [isEmployee, setIsEmployee] = useState([])
    const history = useHistory()

    
    useEffect(() => {
        getPosts()
        .then(setPosts)
        
    },
    []
    )
    
    // useEffect(() => {
    //     employeeCheck(+localStorage.getItem('code_user'))
    //     .then(setIsEmployee)
        
    // },
    // [])
    
    const syncPosts = () => {
        getPosts()
        .then(setPosts)
    }

    const isItTheirPost = (x) => {
        if (x.user.id === +localStorage.getItem('code_user')) { 
            return true
        }
        return false

    }

    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'auto'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      };

    return (
        <>
        <div className="feed__header"><h1 key={'welcome_message'}>Welcome to Collin's Coding Help</h1></div>
        <div className="testtt"><button key={"create_post"} type="createPost" onClick={(evt) => {
            setcreatepost(true)
        }}>Create Post</button></div>
        {
            !!createPostExists
            ? <PostForm setcreatepost={setcreatepost} syncPosts={syncPosts} /> 
            : ""
        }
        {
            !! JSON.parse(localStorage.getItem('isEmployee')) === true
            ? posts.map((post) => {
                return <div key={`post--${post.id}`} className="post">
                <div><h4>Posted by {post.user.user.first_name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p><button onClick={() => {
                    deletePost(post.id)
                    .then(() => {syncPosts()})
                }}>Delete Post</button>{
                    !! isItTheirPost(post)
                    ? <button onClick={() => {history.push(`/posts/${post.id}`)}}>edit</button>
                    : ""
                }</div>
                </div>}).reverse()
            : posts.map((post) => {
                return <fieldset key={`post--${post.id}`}  className="post">
                <div><h4>Posted by {post.user.user.first_name}</h4>
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
        
            <button onClick={() => {scrollToTop()}}>scroll to top</button>
        
        </>
    )
}