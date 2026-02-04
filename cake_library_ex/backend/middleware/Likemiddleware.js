const Like = require("../models/likesmodel");

// Validate if already liked (for likePost)
exports.checkNotAlreadyLiked = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const existingLike = await Like.findOne({ user: userId, post: postId });

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "You already liked this post"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking like status",
            error: err.message
        });
    }
};

// Validate if liked (for unlikePost)
exports.checkAlreadyLiked = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const like = await Like.findOne({ user: userId, post: postId });

        if (!like) {
            return res.status(404).json({
                success: false,
                message: "You haven't liked this post"
            });
        }

        req.like = like;
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking like status",
            error: err.message
        });
    }
};