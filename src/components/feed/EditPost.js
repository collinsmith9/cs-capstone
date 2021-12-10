import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { getPostToEdit, saveEditOfPost } from "../apiManager"
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
    [])

    const handleEditOfPost = (x) => {
        saveEditOfPost(postId, updatedPost, x)
        history.push('/')
    }


    // const handleEdit = () => {
    //     saveEditOfHelpRequest(hrId, updatedHelpRequest )
    //     history.push("/helprequest")
        
    // }




    return (
        <>
        <h1>Edit Post View</h1>

        <PostForm postId={postId} postToEdit={postToEdit} updatedPost={updatedPost} setUpdatedPost={setUpdatedPost} handleEditOfPost={handleEditOfPost} />
        </>
    )
}