import React, { useEffect, useState } from "react"
import { deletePost, getPostsWithUser } from "../apiManager"
import { PostForm } from "./PostForm"
import './Feed.css'


export const Feed = () => {
    const [createPostExists, setcreatepost] = useState(false)
    const [posts, setPosts] = useState([])

    const syncPosts = () => {
        getPostsWithUser()
        .then(setPosts)
    }

    useEffect(() => {
        getPostsWithUser()
        .then(setPosts)

    },
    []
    )


    return (
        <>
        <h1>this is the feed view</h1>
        <button type="createPost" onClick={(evt) => {
            setcreatepost(true)
        }}>Create Post</button>
        {
            !!createPostExists
            ? <PostForm createPostExists={createPostExists} setcreatepost={setcreatepost} syncPosts={syncPosts} /> 
            : ""
        }
        {
            posts.map((post) => {
                return <fieldset className="post">
                <div key={post.id}><h4>Posted by {post.user.name}</h4>
                <h5>Problem descrip: {post.problemDescription}</h5>
                <p>Problem: {post.problem}</p></div>
                {/* {
                    !! post.userId === parseInt(localStorage.getItem('code_user'))
                    ? <button type="delete" onClick={() => {
                        deletePost(post.id)
                        .then(syncPosts)

                    }}>delete post</button>
                    : ""
                } */}
                </fieldset>

            })


        }
        </>
    )
}