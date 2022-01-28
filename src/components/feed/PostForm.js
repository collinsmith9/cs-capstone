import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { uploadPost } from "../apiManager"


export const PostForm = ({ setcreatepost, syncPosts, postId, postToEdit, updatedPost, setUpdatedPost, handleEditOfPost}) => {
    const [newPost, setNewPost] = useState({})
    const history = useHistory()
    const problem = useRef(null)
    const problemDescription = useRef(null)

    const handlePost = (evt) => {
        evt.preventDefault()
        
        const newPostObj = {
            userId: parseInt(localStorage.getItem('code_user')),
            problem: problem.current.value,
            problemDescription: problemDescription.current.value
        }

        uploadPost(newPostObj)
        .then(syncPosts)
        .then(setcreatepost(false))
    }

    return (
        <>
        {
            !! postId 
            ? <div className="post__form">
            <div>
                <label>Describe Your Problem</label>
                <input onChange={(evt) => {
                    const copy = {...updatedPost}
                    copy.problemDescription = evt.target.value
                    setUpdatedPost(copy)
                }} type="text" id="problem_descrip" placeholder={postToEdit.problemDescription}  required autoFocus />
            </div>
            <div>
                <label>Copy and Paste your problem here</label>
                <input onChange={(evt) => {
                    const copy = {...updatedPost}
                    copy.problem = evt.target.value
                    setUpdatedPost(copy)
                }} type="text" id="problem_paste" placeholder={postToEdit.problem}  required autoFocus />
            </div>
            
            <div>
                <button type="cancel" onClick={() => {history.push('/')}}>Cancel</button>
                <button type="submit_post" onClick={handleEditOfPost}>Save Changes</button>
            </div>
            </div>
            : <div className="post__form"><div>
            <label>Describe Your Problem</label>
            <input type="text" ref={problemDescription} placeholder="Describe Your Problem Here" required autoFocus />
        </div>
        <div>
            <label>Copy and Paste your problem here</label>
            <input type="text" ref={problem} placeholder="Past Here" required autoFocus />

        </div>
        
        <div>
            <button type="cancel" onClick={() => {setcreatepost(false)}}>Cancel</button>
            <button type="submit_post" onClick={handlePost}> Submit Post </button>
        </div></div>
}
        </>
    )
}