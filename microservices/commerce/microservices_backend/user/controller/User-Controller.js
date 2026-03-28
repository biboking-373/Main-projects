const { registerUser, loginUser, getUserbyId } = require('../service/User-Service');

const register = async (req, res) => {
try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully.', user });
} catch (error) {
    res.status(400).json({ message: error.message });
};
};


const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({ message: 'Login successful.', token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


const getUser = async (req,res) => {
  try {
    const user = await getUserbyId(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { register, login, getUser };