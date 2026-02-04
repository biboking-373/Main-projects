import apiClient from "./axios";

// ============= LIKE OPERATIONS =============

// Like a post
export const likePost = async (postId) => {
    try {
        const response = await apiClient.post(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Unlike a post
export const unlikePost = async (postId) => {
    try {
        const response = await apiClient.delete(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all likes for a post
export const getPostLikes = async (postId) => {
    try {
        const response = await apiClient.get(`/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Check if user liked a post
export const checkUserLiked = async (postId) => {
    try {
        const response = await apiClient.get(`/posts/${postId}/liked`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
