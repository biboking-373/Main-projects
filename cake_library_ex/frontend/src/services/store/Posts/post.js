import { defineStore } from 'pinia';
import { createPost, getAllPosts, getPost, getUserPosts, deletePost, searchPosts } from '@/services/api/post';

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        currentPost: null,
        userPosts: [],
        searchResults: [],
        pagination: {
            page: 1,
            limit: 20,
            total: 0,
            pages: 0
        },
        loading: false,
        error: null
    }),

    getters: {
        getPostById: (state) => (postId) => {
            return state.posts.find(post => post._id === postId);
        },
        
        postsCount: (state) => state.posts.length,
        
        hasMore: (state) => state.pagination.page < state.pagination.pages
    },

    actions: {
        async fetchAllPosts(page = 1) {
            try {
                this.loading = true;
                this.error = null;
                const data = await getAllPosts(page);
                
                if (page === 1) {
                    this.posts = data.posts;
                } else {
                    // Append for infinite scroll
                    this.posts = [...this.posts, ...data.posts];
                }
                
                this.pagination = data.pagination;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch posts';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async loadMorePosts() {
            if (this.hasMore && !this.loading) {
                await this.fetchAllPosts(this.pagination.page + 1);
            }
        },

        async searchRecipes(searchParams) {
            try {
                this.loading = true;
                this.error = null;
                const data = await searchPosts(searchParams);
                this.searchResults = data.posts;
                this.pagination = data.pagination;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to search posts';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchPost(postId) {
            try {
                this.loading = true;
                this.error = null;
                const data = await getPost(postId);
                this.currentPost = data.post;
                return data.post;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch post';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchUserPosts(userId, page = 1) {
            try {
                this.loading = true;
                this.error = null;
                const data = await getUserPosts(userId, page);
                this.userPosts = data.posts;
                this.pagination = data.pagination;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch user posts';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async addPost(postData) {
            try {
                this.loading = true;
                this.error = null;
                const data = await createPost(postData);
                
                // Add new post to the beginning of posts array
                this.posts.unshift(data.post);
                
                return data.post;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create post';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async removePost(postId) {
            try {
                this.loading = true;
                this.error = null;
                await deletePost(postId);
                
                // Remove post from posts array
                this.posts = this.posts.filter(post => post._id !== postId);
                this.userPosts = this.userPosts.filter(post => post._id !== postId);
                
                if (this.currentPost?._id === postId) {
                    this.currentPost = null;
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete post';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Update likes count locally (optimistic update)
        updatePostLikes(postId, increment) {
            const post = this.posts.find(p => p._id === postId);
            if (post) {
                post.likesCount += increment;
            }
            if (this.currentPost?._id === postId) {
                this.currentPost.likesCount += increment;
            }
        },

        // Update comments count locally (optimistic update)
        updatePostComments(postId, increment) {
            const post = this.posts.find(p => p._id === postId);
            if (post) {
                post.commentsCount += increment;
            }
            if (this.currentPost?._id === postId) {
                this.currentPost.commentsCount += increment;
            }
        }
    }
});