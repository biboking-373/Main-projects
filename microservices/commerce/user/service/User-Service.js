const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userRepo = require('../repository/User_repository');

const registerUser = async ({ username, email, password }) => {
  // Check if email is already taken
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new Error('Email is already registered.');
  }

  // 3. Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Save user
  const user = await userRepo.create({ username, email, password: hashedPassword });

  return { id: user.id, name: user.username, email: user.email };
};


//login service

const loginUser = async ({ email, password }) => {
  // 1. Find user by email
  const user = await userRepo.login(email);
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // 2. Compare password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET,              
    { expiresIn: '1d' }                  
  );

  return { token, user: { id: user.id, username: user.username, email: user.email } };

};





module.exports = { registerUser, loginUser };