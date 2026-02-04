import { defineStore } from 'pinia'
import { likePost, unlikePost, getPostLikes, checkUserLiked } from '@/services/api/like'
import { usePostStore } from '@/services/store/Posts/post'

export const useLikeStore = defineStore('like', {
    state: () => ({
        likedPosts: new Set(), // Store post IDs that user has liked
        postLikes: {}, // Store likes for each post { postId: [likes array] }
        loading: false,
        error: null
    }),

    getters: {
        isPostLiked: (state) => (postId) => {
            return state.likedPosts.has(postId)
        },

        getPostLikesCount: (state) => (postId) => {
            return state.postLikes[postId]?.length || 0
        }
    },

    actions: {
        async toggleLike(postId) {
            const postStore = usePostStore()
            const isLiked = this.likedPosts.has(postId)

            try {
                this.loading = true
                this.error = null

                if (isLiked) {
                    // Unlike
                    await unlikePost(postId)
                    this.likedPosts.delete(postId)
                    postStore.updatePostLikes(postId, -1)
                } else {
                    // Like
                    await likePost(postId)
                    this.likedPosts.add(postId)
                    postStore.updatePostLikes(postId, 1)
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to toggle like'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchPostLikes(postId) {
            try {
                this.loading = true
                this.error = null
                const data = await getPostLikes(postId)
                this.postLikes[postId] = data.likes
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch likes'
                throw error
            } finally {
                this.loading = false
            }
        },

        async checkIfLiked(postId) {
            try {
                const data = await checkUserLiked(postId)
                if (data.liked) {
                    this.likedPosts.add(postId)
                } else {
                    this.likedPosts.delete(postId)
                }
            } catch (error) {
                console.error('Failed to check like status:', error)
            }
        },

        // Check multiple posts at once
        async checkMultipleLikes(postIds) {
            const promises = postIds.map(postId => this.checkIfLiked(postId))
            await Promise.all(promises)
        }
    }
})