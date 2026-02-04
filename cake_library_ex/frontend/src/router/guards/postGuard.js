import { usePostStore } from '@/services/store/Posts/post'
import { useAuthStore } from '@/services/store/Auth/auth'

// Check if post exists
export const postExists = async (to, from, next) => {
    const postStore = usePostStore()
    const postId = to.params.id
    
    try {
        await postStore.fetchPost(postId)
        
        if (!postStore.currentPost) {
        next({ name: 'Recipes', replace: true })
        } else {
        next()
        }
    } catch (error) {
        console.error('Post not found:', error)
        next({ name: 'Recipes', replace: true })
    }
}

// Check if user owns the post (for delete/edit)
export const isPostOwner = async (to, from, next) => {
    const postStore = usePostStore()
    const authStore = useAuthStore()
    const postId = to.params.id
    
    try {
        // Fetch post if not already loaded
        if (!postStore.currentPost || postStore.currentPost._id !== postId) {
        await postStore.fetchPost(postId)
        }
        
        const currentUserId = authStore.user?._id || authStore.user?.id
        const postOwnerId = postStore.currentPost?.user?._id || postStore.currentPost?.user
        
        if (postOwnerId !== currentUserId) {
        // User doesn't own this post
        next({ 
            name: 'RecipeDetail', 
            params: { id: postId },
            replace: true 
        })
        } else {
        next()
        }
    } catch (error) {
        console.error('Error checking post ownership:', error)
        next({ name: 'Recipes', replace: true })
    }
}

// Validate post ID format
export const validPostId = (to, from, next) => {
    const postId = to.params.id
    
    // Check if it's a valid MongoDB ObjectId (24 hex characters)
    if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
        next({ name: 'Recipes', replace: true })
    } else {
        next()
    }
}