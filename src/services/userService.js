import axios from "../axios"
const handelLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`);
}


const createNewUserService = (data) => {
    console.log(`data service`, data);
    return axios.post('/api/create-new-user', data);
}


const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });

}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);

}

export { handelLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService }