import axios from "axios";

const API_URL = '/api/user/';

const getUsers = async (userId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + userId + '/friends', config)
    return response.data
}

const toggleFriend = async ({userId, friendId}, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(API_URL + `${userId}/${friendId}`, config);
    return response.data;
};

const userService = {
    getUsers,
    toggleFriend
}

export default userService;