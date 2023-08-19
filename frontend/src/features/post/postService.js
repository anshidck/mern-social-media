import axios from "axios";

const API_URL = "/api/post/";

const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, postData, config)
    return response.data
}


const getPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const likePosts = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.patch(API_URL + postId + '/like', config)
    return response.data
}

const postService = {
    getPosts,
    createPost,
    likePosts
}

export default postService;