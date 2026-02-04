import { requiresAuth, validPostId, validCommentId, isCommentOwner } from '@/guards'

export default [
    // View all comments for a post (usually embedded in RecipeDetail)
    {
        path: '/recipes/:id/comments',
        name: 'PostComments',
        component: () => import('@/views/Comments/PostComments.vue'),
        meta: { requiresAuth: true },
        beforeEnter: [requiresAuth, validPostId]
    },
    
    // Edit comment (only owner)
    {
        path: '/recipes/:postId/comments/:commentId/edit',
        name: 'EditComment',
        component: () => import('@/views/Comments/EditComment.vue'),
        meta: { requiresAuth: true },
        beforeEnter: [requiresAuth, validPostId, validCommentId, isCommentOwner]
    }
]