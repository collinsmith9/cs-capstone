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
            user: updatedPost.user.id
        }

        fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedPost)
    }).then(() => {
        history.push('/')
    })
    }

    return (
        <>
        <h1 className="editpost__header">Edit Post View</h1>

        <PostForm postId={postId} postToEdit={postToEdit} updatedPost={updatedPost} setUpdatedPost={setUpdatedPost} handleEditOfPost={handleEditOfPost} />
        </>
    )
}