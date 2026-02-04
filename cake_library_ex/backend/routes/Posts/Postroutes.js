// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { addPost, deletePost, getAllPosts, getPost, getUserPost, searchPosts } = require('../../controller/Postscontroller');

// Import your existing auth middleware
const { authmid } = require('../../middleware/Authmiddleware');

// Import post-specific middleware
const { 
    checkPostExists, 
    checkPostOwnership, 
    validatePostContent,
    validateObjectId 
} = require('../../middleware/Postsmiddleware');

// Routes

router.post('/posts', authmid, validatePostContent, addPost);

router.get('/posts', authmid, getAllPosts);
// Search posts
router.get('/posts/search', authmid, searchPosts);

router.get('/posts/:postId', authmid, validateObjectId, checkPostExists, getPost);
router.delete('/posts/:postId', authmid, validateObjectId, checkPostExists, checkPostOwnership, deletePost);
router.get('/users/:userId/posts', authmid, getUserPost);

module.exports = router;