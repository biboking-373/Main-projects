// middleware/postMiddleware.js
const Posts = require("../models/postsmodel");

// Check if post exists
exports.checkPostExists = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Posts.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Attach post to request object for use in next middleware/controller
        req.post = post;
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking post",
            error: err.message
        });
    }
};

// Check if user owns the post
exports.checkPostOwnership = async (req, res, next) => {
    try {
        // Assumes checkPostExists ran first and attached req.post
        const post = req.post;
        const userId = req.user.id;

        if (post.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking post ownership",
            error: err.message
        });
    }
};

// Validate post content
exports.validatePostContent = (req, res, next) => {
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({
            success: false,
            message: "Content is required"
        });
    }

    // Optional: Check content length
    if (content.length > 2200) {
        return res.status(400).json({
            success: false,
            message: "Content is too long. Maximum 2200 characters"
        });
    }

    next();
};

// Validate MongoDB ObjectId format
exports.validateObjectId = (req, res, next) => {
    const { postId } = req.params;

    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: "Invalid post ID format"
        });
    }

    next();
};