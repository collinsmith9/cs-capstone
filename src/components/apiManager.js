

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