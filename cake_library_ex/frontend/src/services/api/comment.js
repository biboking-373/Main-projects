import apiClient from "./axios";

// ============= COMMENT OPERATIONS =============

// Add a comment
export const addComment = async (postId, content) => {
    try {
        const response = await apiClient.post(`/posts/${postId}/comments`, { content });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all comments for a post
export const getPostComments = async (postId) => {
    try {
        const response = await apiClient.get(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await apiClient.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};