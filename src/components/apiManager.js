


export const existingUserCheck = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
    .then(user => user.length ? user[0] : false)

}

export const existingUserCheckForRegister = (customer) => {
    return fetch(`http://localhost:8088/users?email=${customer.email}`)
    .then(res => res.json())
    .then(user => !!user.length)

}


export const getPosts = () => {
    return fetch('http://localhost:8000/posts', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}


export const uploadPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(post)
    }
    return fetch(`http://localhost:8000/posts`, fetchOptions)
    .then(response => response.json())

}

export const uploadHelpRequest = (helpRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(helpRequest)
    }
    return fetch(`http://localhost:8088/helpRequests`, fetchOptions)
    .then(response => response.json())

}

export const getHelpRequestsWithUser = () => {
    return fetch(`http://localhost:8088/helpRequests?_expand=user`)
    .then(res => res.json())

}

export const getEmployees = () => {
    return fetch(`http://localhost:8088/users?partner=true`)
    .then(res => res.json())
}

export const deleteHelpRequest = (id) => {
    return fetch(`http://localhost:8088/helpRequests/${id}`, {method: "DELETE"})


}

export const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})

}

export const getUsersHelpRequests = (id) => {
    return fetch(`http://localhost:8088/helpRequests?userId=${id}&_expand=user`)
    .then(res => res.json())
}

export const employeeCheck = (id) => {
    return fetch(`http://localhost:8088/users?partner=true&id=${id}`)
    .then(res => res.json())

}


export const fetchEditHelpRequest = (id) => {
    return fetch(`http://localhost:8088/helpRequests/${id}`)
    .then(res => res.json())
}

export const getPostToEdit = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {headers: {"Content-Type": "application/json", "Authorization": `Token ${localStorage.getItem('token')}`}})
    .then(res => res.json())

}

export const saveEditOfHelpRequest = (id, editOptions, sync) => {
    fetch(`http://localhost:8088/helpRequests/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editOptions)
    })
        
}

export const saveEditOfPost = (id, editOptions, sync) => {
    fetch(`http://localhost:8088/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editOptions)
    })

        
}

export const getAUsersPosts = (id) => {
    return fetch(`http://localhost:8088/posts?_expand=user&userId=${id}`)
    .then(res => res.json())
}

export const getUser = (id) => {
    return fetch(`http://localhost:8088/users?id=${id}`)
    .then(res => res.json())
}
