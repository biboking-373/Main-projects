import apiClient from "./axios";

// ============= POST OPERATIONS =============

// Create a new post/recipe
export const createPost = async(postData) => {
    try {
        const response = await apiClient.post("/posts", postData);
        return response.data
    } catch(err) {
        throw err.response?.data || err.message;
    }
};

// Get all posts (feed)
export const getAllPosts = async () => {
    try {
        const response = await apiClient.get('/posts');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get single post by ID
export const getPost = async (postId) => {
    try {
        const response = await apiClient.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Search posts
export const searchPosts = async (searchParams) => {
    try {
        const { query, category, tags, page = 1, limit = 20 } = searchParams;
        const params = new URLSearchParams();
        
        if (query) params.append('query', query);
        if (category) params.append('category', category);
        if (tags) params.append('tags', tags);
        params.append('page', page);
        params.append('limit', limit);

        const response = await apiClient.get(`/posts/search?${params.toString()}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// Get posts by specific user
export const getUserPosts = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}/posts`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a post
export const deletePost = async (postId) => {
    try {
        const response = await apiClient.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};