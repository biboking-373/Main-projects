import { defineStore } from 'pinia'
import { addComment, getPostComments, deleteComment } from '@/services/api/comment'
import { usePostStore } from '@/services/store/Posts/post'

export const useCommentStore = defineStore('comment', {
    state: () => ({
        comments: {}, // Store comments for each post { postId: [comments array] }
        loading: false,
        error: null
    }),

    getters: {
        getPostComments: (state) => (postId) => {
            return state.comments[postId] || []
        },

        getCommentsCount: (state) => (postId) => {
            return state.comments[postId]?.length || 0
        }
    },

    actions: {
        async fetchComments(postId) {
            try {
                this.loading = true
                this.error = null
                const data = await getPostComments(postId)
                this.comments[postId] = data.comments
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch comments'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createComment(postId, content) {
            const postStore = usePostStore()

            try {
                this.loading = true
                this.error = null
                const data = await addComment(postId, content)
                
                // Add new comment to the beginning of comments array
                if (!this.comments[postId]) {
                    this.comments[postId] = []
                }
                this.comments[postId].unshift(data.comment)
                
                // Update comments count in post store
                postStore.updatePostComments(postId, 1)
                
                return data.comment
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to add comment'
                throw error
            } finally {
                this.loading = false
            }
        },

        async removeComment(postId, commentId) {
            const postStore = usePostStore()

            try {
                this.loading = true
                this.error = null
                await deleteComment(commentId)
                
                // Remove comment from comments array
                if (this.comments[postId]) {
                    this.comments[postId] = this.comments[postId].filter(
                        comment => comment._id !== commentId
                    )
                }
                
                // Update comments count in post store
                postStore.updatePostComments(postId, -1)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete comment'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})