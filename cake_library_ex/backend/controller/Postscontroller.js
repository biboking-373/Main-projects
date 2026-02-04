const Posts = require("../models/postsmodel");
const Comment = require("../models/commentmodel");
const Like = require("../models/likesmodel");

// User_actions
exports.addPost = async(req, res) => {
    try {
        const {content, imageUrl, videoUrl} = req.body;

        const userId = req.user.id;

        if (!content || content.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }

        const newPost = await Posts.create({
            user: userId,
            content: content.trim(),
            imageUrl: imageUrl || null,
            videoUrl: videoUrl || null
        });

        await newPost.populate('user', 'username email'); // Fixed: space-separated

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post: newPost
        });

    } catch(err) {
        console.error("Error Creating Post", err);
        res.status(500).json({
            success: false,
            message: "Server error while creating post",
            error: err.message
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        //Find the post

        const post = await Posts.findById(postId);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        };

        if (post.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "This is not your post. You are not authorized",
                error: "Forbidden"
            })
        };

        await Like.deleteMany({post: postId});
        await Comment.deleteMany({post: postId});

        await Posts.findByIdAndDelete(postId);

        res.status(200).json({
            success:true,
            message: "Post deleted successfully"
        });

    } catch(err){
        console.error("error deleting this post");
        res.status(500).json({
            success: false,
            message: "Server error while deleting post",
            error: err.message
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const Posts = await Posts.find()
            .populate('user', 'username email')
            .sort({createdAt: -1}) // take the new id 
            .limit(20); // for pagination context
        
            res.status(201).json({
                success: true,
                post: posts
            });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error fetching posts",
            error: err.message
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Posts.findById(postId)
            .populate('user', 'username email');
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            post: post
        });

    } catch(err){
        res.status(500).json({
            success: false,
            message: "Error fetching Post",
            error: err.message
        });
    }
};

exports.getUserPost = async (req, res) => {
    try {
        const { userId } = req.params;

        const post = await Posts.find({user: userId})
            .populate('user', 'username email')
            .sort({createdAt: -1});
        
        res.status(200).json({
            success: true,
            post: posts
        });
        
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error fetching user posts",
            error: err.message
        });
    }
};

exports.searchPosts = async(req, res) => {
    try {
        const { query, category, tags } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = {};
        
        if (query) {
            filter.content = { $regex: query, $options: 'i' }; // Case-insensitive search
        }
        
        if (category) {
            filter.category = category;
        }
        
        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        const posts = await Posts.find(filter)
            .populate('user', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Posts.countDocuments(filter);

        res.status(200).json({
            success: true,
            posts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch(err) {
        console.error("Error searching posts:", err);
        res.status(500).json({
            success: false,
            message: "Server error while searching posts",
            error: err.message
        });
    }
};
