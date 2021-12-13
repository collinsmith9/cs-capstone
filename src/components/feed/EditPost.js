import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { getPostToEdit } from "../apiManager"
import { PostForm } from "./PostForm"



export const EditPost = () => {
    const [postToEdit, setPostToEdit] = useState({})
    const [updatedPost, setUpdatedPost] = useState({})
    const history = useHistory()
    const {postId} = useParams()

    useEffect(() => {
        getPostToEdit(postId)
        .then( (data) => {
            setPostToEdit(data)
            setUpdatedPost(data)
            
        })

    },
    [postId])

    const handleEditOfPost = (e) => {
        e.preventDefault()

        const editedPost = {
            problemDescription: updatedPost.problemDescription,
            problem: updatedPost.problem,
            userId: updatedPost.userId
        }

        fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    }).then(() => {
        history.push('/')
    })
    }

    return (
        <>
        <h1>Edit Post View</h1>

        <PostForm postId={postId} postToEdit={postToEdit} updatedPost={updatedPost} setUpdatedPost={setUpdatedPost} handleEditOfPost={handleEditOfPost} />
        </>
    )
}