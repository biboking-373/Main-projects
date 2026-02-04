import { useCommentStore } from '@/services/store/Comment/comment'
import { useAuthStore } from '@/services/store/Auth/auth'

// Check if user owns the comment (for delete)
export const isCommentOwner = async (to, from, next) => {

    const commentStore = useCommentStore()
    const authStore = useAuthStore()
    const { postId, commentId } = to.params

    
    try {
        // Fetch comments if not loaded
        if (!commentStore.comments[postId]) {
        await commentStore.fetchComments(postId)
        }
        
        const comment = commentStore.getPostComments(postId).find(
        c => c._id === commentId
        )
        
        if (!comment) {
        next({ name: 'RecipeDetail', params: { id: postId }, replace: true })
        return
        }
        
        const currentUserId = authStore.user?._id || authStore.user?.id
        const commentOwnerId = comment.user?._id || comment.user
        
        if (commentOwnerId !== currentUserId) {
        next({ name: 'RecipeDetail', params: { id: postId }, replace: true })
        } else {
        next()
        }
    } catch (error) {
        console.error('Error checking comment ownership:', error)
        next({ name: 'RecipeDetail', params: { id: postId }, replace: true })
    }
}

// Validate comment ID format
export const validCommentId = (to, from, next) => {
    const commentId = to.params.commentId
    
    if (!commentId || !commentId.match(/^[0-9a-fA-F]{24}$/)) {
        next({ name: 'Recipes', replace: true })
    } else {
        next()
    }
}