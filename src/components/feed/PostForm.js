import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { uploadPost } from "../apiManager"


export const PostForm = ({ setcreatepost, syncPosts, postId, postToEdit, updatedPost, setUpdatedPost, handleEditOfPost}) => {
    const [newPost, setNewPost] = useState({})
    const history = useHistory()

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
        {
            !! postId 
            ? <div>
            <fieldset>
                <label>Describe Your Problem</label>
                <input onChange={(evt) => {
                    const copy = {...updatedPost}
                    copy.problemDescription = evt.target.value
                    setUpdatedPost(copy)
                }} type="text" id="problem_descrip" placeholder={postToEdit.problemDescription}  required autoFocus />
            </fieldset>
            <fieldset>
                <label>Copy and Paste your problem here</label>
                <input onChange={(evt) => {
                    const copy = {...updatedPost}
                    copy.problem = evt.target.value
                    setUpdatedPost(copy)
                }} type="text" id="problem_paste" placeholder={postToEdit.problem}  required autoFocus />
            </fieldset>
            
            <fieldset>
                <button type="cancel" onClick={() => {history.push('/')}}>Cancel</button>
                <button type="submit_post" onClick={handleEditOfPost}>Save Changes</button>
            </fieldset>
            </div>
            : <div><fieldset>
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
        </fieldset></div>
}
        </>
    )
}