const express = require('express');
const router = express.Router();
const { addComment, deleteComment, getPostComments } = require('../../controller/Commentcontroller');
const { authmid } = require('../../middleware/Authmiddleware');
const { checkPostExists, validateObjectId } = require('../../middleware/Postsmiddleware');
const { 
    validateCommentContent, 
    checkCommentExists, 
    checkCommentOwnership,
    validateCommentId 
} = require('../../middleware/Commentmiddleware');

// Add a comment to a post
router.post('/posts/:postId/comments', authmid, validateObjectId, checkPostExists, validateCommentContent, addComment);

// Get all comments for a post
router.get('/posts/:postId/comments', authmid, validateObjectId, checkPostExists, getPostComments);

// Delete a comment
router.delete('/comments/:commentId', authmid, validateCommentId, checkCommentExists, checkCommentOwnership, deleteComment);

module.exports = router;