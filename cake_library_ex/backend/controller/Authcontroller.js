const bcrypt = require("bcrypt");
const User = require('../models/usermodel')
const jwt = require("jsonwebtoken")

//register
exports.register = async (req, res) =>{
    const {username, email, password} = req.body;
    try{

        let userr = await User.findOne({email});
        if (userr){
            return res.status(400).json({message:"User already exists"});
        }

        let usernamee = await User.findOne({username});
        if (usernamee){
            return res.status(400).json({message: "Username already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// login

exports.login = async(req, res) => {
    const {email, password} = req.body

    try{
        if (!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await User.findOne({email})
        if (!user){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const ismatchh = await bcrypt.compare(password, user.password);

        if (!ismatchh){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        });

        res.status(200).json({
            message: "You have successfully logged in",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }catch(err){
        return res.status(500).json({error: err.message});
    };
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});  // ← Changed to 200
}


exports.checkAuth = async (req, res) => {
    try {
        // req.user is set by authmid middleware
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error checking authentication"
        });
    }
};

//forgot_password

//reset_password
