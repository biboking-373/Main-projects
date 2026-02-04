const Comment = require("../models/commentmodel");
const Post = require("../models/postsmodel");

// Add a comment
exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        if (!content || content.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Comment content is required"
            });
        }

        const newComment = await Comment.create({
            user: userId,
            post: postId,
            content: content.trim()
        });

        // Increment commentsCount on post
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

        await newComment.populate('user', 'username email');

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({
            success: false,
            message: "Server error while adding comment",
            error: err.message
        });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Check if user owns the comment
        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        const postId = comment.post;

        await Comment.findByIdAndDelete(commentId);

        // Decrement commentsCount on post
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({
            success: false,
            message: "Server error while deleting comment",
            error: err.message
        });
    }
};

// Get all comments for a post
exports.getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate('user', 'username email')
            .sort({ createdAt: -1 }); // newest first

        res.status(200).json({
            success: true,
            count: comments.length,
            comments: comments
        });

    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({
            success: false,
            message: "Server error while fetching comments",
            error: err.message
        });
    }
};