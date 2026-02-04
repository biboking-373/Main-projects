const express = require('express');
const router = express.Router();
const { likePost, unlikePost, getPostLikes, checkUserLiked } = require('../../controller/Likescontroller');
const { authmid } = require('../../middleware/Authmiddleware');
const { checkPostExists, validateObjectId } = require('../../middleware/Postsmiddleware');

// Like a post
router.post('/posts/:postId/like', authmid, validateObjectId, checkPostExists, likePost);

// Unlike a post
router.delete('/posts/:postId/like', authmid, validateObjectId, checkPostExists, unlikePost);

// Get all likes for a post
router.get('/posts/:postId/likes', authmid, validateObjectId, checkPostExists, getPostLikes);

// Check if user liked a post
router.get('/posts/:postId/liked', authmid, validateObjectId, checkPostExists, checkUserLiked);

module.exports = router;