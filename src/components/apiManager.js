

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

export const getPostsWithUser = () => {
    return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(res => res.json())

}

export const uploadPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }
    return fetch(`http://localhost:8088/posts`, fetchOptions)
    .then(response => response.json())

}