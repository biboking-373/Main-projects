const Like = require("../models/likesmodel");
const Post = require("../models/postsmodel");

exports.likePost = async (req,res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const existingLike = await Like.findOne({userId: userId, post: postId});

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "You already liked this post"
            })
        }

        const newLike = await Like.create({
            user: userId,
            post: postId
        });

        await Post.findByIdAndUpdate(postId, {$inc: { likesCount: 1}});

        res.status(200).json({
            success: true,
            message: "Post liked",
            like: newLike
        });

    } catch(err){
        console.error("Error liking post:", err);
        res.status(500).json({
            success: false,
            message: "Server error while liking post",
            error: err.message
        });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Find and delete like
        const like = await Like.findOneAndDelete({ user: userId, post: postId });

        if (!like) {
            return res.status(404).json({
                success: false,
                message: "You haven't liked this post"
            });
        }

        // Decrement likesCount on post
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

        res.status(200).json({
            success: true,
            message: "Post unliked successfully"
        });

    } catch (err) {
        console.error("Error unliking post:", err);
        res.status(500).json({
            success: false,
            message: "Server error while unliking post",
            error: err.message
        });
    }
};

// Get all likes for a post
exports.getPostLikes = async (req, res) => {
    try {
        const { postId } = req.params;

        const likes = await Like.find({ post: postId })
            .populate('user', 'username email');

        res.status(200).json({
            success: true,
            count: likes.length,
            likes: likes
        });

    } catch (err) {
        console.error("Error fetching likes:", err);
        res.status(500).json({
            success: false,
            message: "Server error while fetching likes",
            error: err.message
        });
    }
};

// Check if user liked a post
exports.checkUserLiked = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const like = await Like.findOne({ user: userId, post: postId });

        res.status(200).json({
            success: true,
            liked: !!like
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error checking like status",
            error: err.message
        });
    }
};