import React, { useState } from "react"
import { uploadPost } from "../apiManager"


export const PostForm = ({createPostExists, setcreatepost, syncPosts}) => {
    const [newPost, setNewPost] = useState({})

    const handlePost = (evt) => {
        evt.preventDefault()
        
        const newPostObj = {
            userId: parseInt(localStorage.getItem('code_user')),
            problem: newPost.problem,
            problemDescription: newPost.problemDescription
        }

        uploadPost(newPostObj)
        .then(syncPosts)
        .then(setcreatepost(false))
    }

    return (
        <>
        <form className="createPostForm" >
            <fieldset>
                <label>Describe Your Problem</label>
                <input onChange={(evt) => {
                    const copy = {...newPost}
                    copy.problemDescription = evt.target.value
                    setNewPost(copy)
                }} type="text" id="problem_descrip" placeholder="Describe Your Problem Here"  required autoFocus />
            </fieldset>
            <fieldset>
                <label>Copy and Paste your problem here</label>
                <input onChange={(evt) => {
                    const copy = {...newPost}
                    copy.problem = evt.target.value
                    setNewPost(copy)
                }} type="text" id="problem_paste" placeholder="Paste Here"  required autoFocus />
            </fieldset>
            
            <fieldset>
                <button type="cancel" onClick={() => {setcreatepost(false)}}>Cancel</button>
                <button type="submit_post" onClick={handlePost}> Submit Post </button>
            </fieldset>
        </form>
        </>
    )
}