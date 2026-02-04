const Comment = require("../models/commentmodel");

// Validate comment content
exports.validateCommentContent = (req, res, next) => {
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({
            success: false,
            message: "Comment content is required"
        });
    }

    if (content.length > 500) {
        return res.status(400).json({
            success: false,
            message: "Comment is too long. Maximum 500 characters"
        });
    }

    next();
};

// Check if comment exists
exports.checkCommentExists = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        req.comment = comment;
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking comment",
            error: err.message
        });
    }
};

// Check if user owns the comment
exports.checkCommentOwnership = async (req, res, next) => {
    try {
        const comment = req.comment;
        const userId = req.user.id;

        if (comment.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking comment ownership",
            error: err.message
        });
    }
};

// Validate comment ID format
exports.validateCommentId = (req, res, next) => {
    const { commentId } = req.params;

    if (!commentId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: "Invalid comment ID format"
        });
    }

    next();
};